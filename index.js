const express = require("express");
const cookieParser = require("cookie-parser");
const { HttpError } = require("http-errors");

const app = express();
const hpp = require("hpp");
const helmet = require("helmet");

const authRoutes = require("./routers/auth");

require("dotenv").config();

app.use(cookieParser(process.env.COOKIE_SECRET || "secret"));

app.use(express.urlencoded({ extended: true, limit: "1kb" }));

app.use(hpp());
app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(express.json());

app.use("/auth", authRoutes);

// Error handler
app.use((error, req, res, next) => {
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

    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});
