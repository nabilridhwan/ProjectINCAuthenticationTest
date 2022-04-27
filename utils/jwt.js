const jwt = require("jsonwebtoken");
const CONFIG = require("./config");

// Generates a new token with the payload.
module.exports.generate = (payload) => {
    // We parse payload as a JSON object again
    return jwt.sign(payload, CONFIG.JWT_SECRET, {
        expiresIn: "1h",
    });
};

// Returns a promise with the decoded payload otherwise it will return an error.
module.exports.verify = (token) => {
    return jwt.verify(token, CONFIG.JWT_SECRET);
};
