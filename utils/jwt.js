const jwt = require("jsonwebtoken");
const CONFIG = require("./config");

// Generates a new token with the payload.
module.exports.generate = (payload) =>
    jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: "1h" });

// Returns a promise with the decoded payload otherwise it will return an error.
module.exports.verify = (token) => jwt.verify(token, CONFIG.JWT_SECRET);
