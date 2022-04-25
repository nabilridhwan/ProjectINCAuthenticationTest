const Admin = require("../classes/Admin");
const Staff = require("../classes/Staff");
const jwt = require("../utils/jwt");
const { checkIfExists, addUser } = require("../utils/usersUtils");
const createError = require("http-errors");

const User = require("../model/user");
const { CONSTRAINTS } = require("../utils/db");
const { stringifyUser } = require("../utils/stringifyUser");

const AdminUserManagement = {
    register: async (req, res, next) => {
        try {
            if (!req.body.email || !req.body.username) {
                return next(createError(400, "Missing required fields"));
            }

            // Get the user data from the body
            const {
                username,
                email,
                password = "",
                privilegeid = 1,
            } = req.body;

            // TODO: Something goes wrong when recreating a new user with different username/email. It still returns the error below.

            const user = await User.insertUser(
                username,
                email,
                password,
                privilegeid
            );

            // Generate jwt that expires in 1 hour
            const accessToken = jwt.generateRegisteringUser(
                stringifyUser(user)
            );

            const messageToSendToUser = `You are required to register your account by clicking the link below.\n\nhttp://localhost:3000/auth/activate?accessToken=${accessToken}.\n\nThe link will expire in 1 hour.`;

            console.log(messageToSendToUser);

            // Generate a token in jwt
            return res.json({
                success: true,
                message: "Successfully created user! Sent link with more info.",
            });
        } catch (error) {
            if (error.code === "P2002") {
                return next(createError(400, "User already exists"));
            }
        }
    },
};

module.exports = AdminUserManagement;
