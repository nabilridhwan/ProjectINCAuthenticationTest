require("dotenv").config();

const CONFIG = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    DB_CONNECTION: process.env.PG_CONNECTION,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_REGISTERING_USER: process.env.JWT_SECRET_REGISTERING_USER,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_NAME: process.env.FROM_NAME,
};

module.exports = CONFIG;
