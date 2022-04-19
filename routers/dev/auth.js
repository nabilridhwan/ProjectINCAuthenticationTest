const express = require("express");
const router = express.Router();

const jwtRegisterUser = require("../../utils/jwtRegisteringUser");

const jwt = require("../../utils/jwt");
const createError = require("http-errors");

// Create an endpoint which decodes the token and returns the decoded data and get the type of the token (either from normal or register) from the query.
router.get("/", async (req, res, next) => {
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
});

module.exports = router;
