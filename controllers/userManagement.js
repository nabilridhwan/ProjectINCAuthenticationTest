const createError = require("http-errors");
const {
    checkIfExists,
    addUser,
    findUserByEmail,
    editUserDetails,
} = require("../model/user");
const jwt = require("../utils/jwt");

const UserManagement = {
    activateAccount: async (req, res, next) => {
        if (!req.query.accessToken || !req.body.password) {
            next(createError(400, "Missing required fields"));
        }

        // Get the token in the query and decode the data
        const { accessToken } = req.query;
        const { password } = req.body;

        try {
            let decodedData = await jwt.verifyRegisteringUser(accessToken);

            // Get the email from decodedData
            const { email } = decodedData;

            // Find the user from the email
            let user = findUserByEmail(email);

            if (user.length === 0) {
                return next(createError(404, "User does not exist"));
            } else {
                // User is now index 0
                user = user[0];

                if (user.registered) {
                    return next(createError(400, "User already registered"));
                }

                // Change the password of the user based on the password from the body
                user.password = password;
                user.registered = true;

                // Edit user details
                editUserDetails(user);
                return res.json({
                    success: true,
                    message: "User registered successfully",
                });
            }

            // return res.json(decodedData);
        } catch (error) {
            return next(createError(400, "Invalid token"));
        }
    },

    login: async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return next(createError(400, "Missing required fields"));
        }

        const { email, password } = req.body;

        User.findUserByEmail(email).then((rows) => {
            if (!rows || rows.length === 0)
                return next(createError(404, "User does not exist"));

            let user = rows[0];

            // Check the password
            if (user.password !== password) {
                return next(createError(401, "Invalid password"));
            }

            // Delete the password
            delete user.password;

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
        });
    },
    signup: (req, res, next) => {
        if (
            !req.body.userID ||
            !req.body.name ||
            !req.body.email ||
            !req.body.password ||
            !req.body.age ||
            !req.body.username
        ) {
            return next(createError(400, "Missing required fields"));
        }

        // Get the user data from the body
        const {
            userID,
            name,
            email,
            password,
            role = "staff",
            age,
            username,
        } = req.body;
        let user;

        // Create a new object for the user according to their role
        if (role === "admin") {
            user = new Admin(userID, username, name, email, password, age);
        } else {
            user = new Staff(userID, username, name, email, password, age);
        }

        if (checkIfExists(user)) {
            next(
                createError(
                    400,
                    "User already exists with the username or email"
                )
            );
        } else {
            addUser(user);
            const generatedToken = jwt.generate(user.getSafeObject());

            res.cookie("token", generatedToken, {
                httpOnly: true,
            });

            // Generate a token in jwt
            return res.json({ success: true });
        }
    },

    logout: (req, res, next) => {
        res.clearCookie("token");
        return res.json({ success: true });
    },

    getUserDetails: async (req, res, next) => {
        if (!req.body.accessToken || !req.query.type) {
            next(createError(400, "Missing required fields"));
        }

        // Get the token in the query and decode the data
        const { accessToken } = req.body;
        const { type } = req.query;

        try {
            let decodedData;

            if (type === "register") {
                decodedData = await jwtRegisterUser.verify(accessToken);
            } else {
                decodedData = await jwt.verify(accessToken);
            }

            return res.json(decodedData);
        } catch (error) {
            return next(createError(400, `Invalid token for ${type}`));
        }
    },
};

module.exports = UserManagement;
