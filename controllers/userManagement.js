const createError = require("http-errors");
const User = require("../model/user");
const jwt = require("../utils/jwt");

const Passwords = require("../utils/passwords");
const Verification = require("../model/verification");

const UserManagement = {
    activateAccount: async (req, res, next) => {
        if (!req.params.guid || !req.body.password) {
            next(createError(400, "Missing required fields"));
        }

        // Get the token in the query and decode the data
        const { guid } = req.params;
        let { password } = req.body;

        try {
            // Find user by guid
            const data = await Verification.findUserByGuid(guid);

            if (!data || !data.userid) {
                return next(createError(404, "Verification not found"));
            }

            // Check if the expires_in has already expired
            const date = new Date();
            if (data.expires_in < date) {
                return next(createError(400, "The link has expired"));
            }

            // Extract the userid from the data
            const { userid } = data;

            // Find the user from the user id
            const user = await User.findUserByUserID(userid);

            if (!user) {
                return next(createError(404, "User does not exist"));
            }

            if (user.password) {
                return next(createError(400, "User already registered"));
            }

            // Encrypt the password
            password = await Passwords.hashPassword(password);

            // Edit user details
            await User.updateUserByUserID(userid, {
                password,
                privilegeid: 2,
            });
            // Delete the verifcation
            await Verification.deleteVerification(data.verification_id);

            return res.json({
                success: true,
                message: "User registered successfully",
            });

            // return res.json(decodedData);
        } catch (error) {
            // console.log(error);
            return next(createError(400, "Invalid token"));
        }
    },

    login: async (req, res, next) => {
        try {
            if (!req.body.email || !req.body.password) {
                return next(createError(400, "Missing required fields"));
            }

            const { email, password } = req.body;

            const user = await User.findUserByEmail(email);

            if (!user) return next(createError(404, "User does not exist"));

            // Check the password
            const isPasswordValid = await Passwords.comparePassword(
                password,
                user.password
            );

            // If password is invalid, return error
            if (!isPasswordValid) next(createError(401, "Invalid password"));

            // Delete the password and privilege
            delete user.password;
            delete user.privilege;

            // Generate jwt token
            const token = jwt.generate(user);

            // Set a cookie with maxAge being 1 hour
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            });

            // Password is correct
            return res.json({
                success: true,
                message: "User logged in successfully",
            });
        } catch (error) {
            // console.log(error);
            return next(createError(500, error));
        }
    },

    logout: (req, res) => {
        res.clearCookie("token");
        return res.json({ success: true });
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.getAllUsers();
            return res.json(users);
        } catch (error) {
            return next(
                createError(
                    500,
                    "Something went wrong while grabbing all users"
                )
            );
        }
    },
};

module.exports = UserManagement;
