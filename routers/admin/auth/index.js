const express = require("express");
const createError = require("http-errors");
const Admin = require("../../../classes/Admin");
const Staff = require("../../../classes/Staff");
const router = express.Router();
const jwtRegisterUser = require("../../../utils/jwtRegisteringUser");
const { checkIfExists, addUser } = require("../../../utils/usersUtils");

// This route allows for the admin to add a user and assign a name and email to the user. The user then receives an email to activate their account.
router.post("/register", (req, res, next) => {
    if (
        !req.body.userID ||
        !req.body.name ||
        !req.body.email ||
        !req.body.age ||
        !req.body.username
    ) {
        return next(createError(400, "Missing required fields"));
    }

    // Get the user data from the body
    const { userID, name, email, role = "staff", age, username } = req.body;

    // Set password as empty
    const password = "";

    let user;

    // Create a new object for the user according to their role
    if (role === "admin") {
        user = new Admin(userID, username, name, email, password, age, false);
    } else {
        user = new Staff(userID, username, name, email, password, age, false);
    }

    // TODO: Something goes wrong when recreating a new user with different username/email. It still returns the error below.
    if (checkIfExists(user)) {
        next(
            createError(400, "User already exists with the username or email")
        );
    } else {
        console.log(user);
        addUser(user);

        // Generate jwt that expires in 1 hour
        const accessToken = jwtRegisterUser.generate(user.getSafeObject());

        const messageToSendToUser = `You are required to register your account by clicking the link below.\n\nhttp://localhost:3000/auth/activate?accessToken=${accessToken}.\n\nThe link will expire in 1 hour.`;

        console.log(messageToSendToUser);

        // Generate a token in jwt
        return res.json({
            success: true,
            message: "Successfully created user! Sent link with more info.",
        });
    }
});

module.exports = router;
