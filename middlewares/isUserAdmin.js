const createHttpErrors = require("http-errors");
const jwt = require("../utils/jwt");

module.exports.isUserAdmin = async (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return next(createHttpErrors(401, "You are not logged in."));
    }

    try {
        // If there is cookies, decode the token
        const decoded = await jwt.verify(req.cookies.token);

        // Check if the current user has a privilege of admin
        if (decoded.privilegeid !== 3) {
            return next(createHttpErrors(403, "You are not an admin."));
        }

        // Go to the next middleware
        return next();
    } catch (error) {
        return next(createHttpErrors(401, "You are not logged in."));
    }
};
