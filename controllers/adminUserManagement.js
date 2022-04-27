const jwt = require("../utils/jwt");
const createError = require("http-errors");

const User = require("../model/user");
const { CONSTRAINTS } = require("../utils/db");
const sendMail = require("../utils/sendMail");
const { v4: uuidv4 } = require("uuid");
const Verification = require("../model/verification");

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

            // Insert a verification token into the database
            const guidToken = uuidv4();
            await Verification.insertVerification(user.userid, guidToken);

            const messageToSendToUser = `You are required to register your account by clicking the link below.\n\nhttp://localhost:3000/auth/activate/${guidToken}.\n\nThe link will expire in 1 hour.`;

            await sendMail(
                email,
                "Account activation",
                messageToSendToUser,
                `
                <h1>
                    Account activation
                </h1>
                <p>
                    You are required to register your account by sending a POST request to the link below with "password" as part of the body's request.

                    <strong>
                        The link is valid for 1 hour only
                    </strong>
                </p>

                <code>http://localhost:3000/auth/activate/${guidToken}</code>

            `
            );

            console.log(`Sent mail to ${email}`);

            console.log(messageToSendToUser);

            // Generate a token in jwt
            return res.json({
                success: true,
                message: "Successfully created user! Sent link with more info.",
            });
        } catch (error) {
            console.error(error);

            if (error.code === "P2002") {
                return next(createError(400, "User already exists"));
            }

            return next(createError(500, "Something went wrong"));
        }
    },
};

module.exports = AdminUserManagement;
