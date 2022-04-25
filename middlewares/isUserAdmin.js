const jwt = require("../utils/jwt");
const createHttpErrors = require("http-errors");

module.exports.isUserAdmin = async (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return next(createHttpErrors(401, "You are not logged in."));
    }

    try {
        // If there is cookies, decode the cookie
        const decoded = await jwt.verify(req.cookies.token);

        if (decoded.privilegeid !== 3) {
            return next(createHttpErrors(403, "You are not an admin."));
        }

        next();
    } catch (error) {
        console.log(error);
        return next(createHttpErrors(401, "You are not logged in."));
    }
};
