const { HttpError } = require("http-errors");

// Error handler
module.exports = (error, req, res, next) => {
    console.log(error);
    if (error instanceof HttpError) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    } else {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }

    return next();
};
