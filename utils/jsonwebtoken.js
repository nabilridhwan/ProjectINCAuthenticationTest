const jwt = require("jsonwebtoken");

// Generates a new token with the payload.
module.exports.generate = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Returns a promise with the decoded payload otherwise it will return an error.
module.exports.verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
