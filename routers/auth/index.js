const express = require("express");
const createError = require("http-errors");
const Admin = require("../../classes/Admin");
const Staff = require("../../classes/Staff");
const User = require("../../classes/User");
const router = express.Router();
const jwt = require("../../utils/jsonwebtoken");
const { checkIfExists, addUser } = require("../../utils/usersUtils");

router.post("/login", async (req, res, next) => {
    // await jwt.generate()

    if (
        !req.cookies ||
        !Object.prototype.hasOwnProperty.call(req.cookies, "token")
    ) {
        return next(createError(401, "Unauthorized"));
    }

    let decodedData = await jwt.verify(req.cookies.token);

    return res.json(decodedData);
});

router.post("/signup", (req, res, next) => {
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

    // TODO: Something goes wrong when recreating a new user with different username/email. It still returns the error below.
    if (checkIfExists(user)) {
        next(
            createError(400, "User already exists with the username or email")
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
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ success: true });
});

module.exports = router;
