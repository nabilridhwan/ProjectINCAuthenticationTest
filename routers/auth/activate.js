const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const jwt = require("../../utils/jsonwebtoken");
const { findUserByEmail, editUserDetails } = require("../../utils/usersUtils");

router.post("/", async (req, res, next) => {
    if (!req.query.accessToken || !req.body.password) {
        next(createError(400, "Missing required fields"));
    }

    // Get the token in the query and decode the data
    const { accessToken } = req.query;
    const { password } = req.body;

    console.log(accessToken);

    try {
        let decodedData = await jwt.verify(accessToken);

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
});

module.exports = router;
