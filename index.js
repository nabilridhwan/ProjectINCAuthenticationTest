const express = require("express");
const cookieParser = require("cookie-parser");
const { HttpError } = require("http-errors");

const app = express();
const hpp = require("hpp");
const helmet = require("helmet");

const authRoutes = require("./routers/auth");
const adminAuthRoutes = require("./routers/admin/auth");
const devAuthRoutes = require("./routers/dev/auth");

const users = require("./utils/usersSimulation");

require("dotenv").config();

app.use(cookieParser(process.env.COOKIE_SECRET || "secret"));

app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));

// Prevents HTTP parameter pollution
app.use(hpp());
app.use(helmet());

// Hides the X-Powered-By header
app.use(helmet.hidePoweredBy());

app.use("/auth", authRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/dev/auth", devAuthRoutes);

// Error handler
app.use((error, req, res, next) => {
    // console.error(error);

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

// This middleware shows the users at every step of the process in table form
app.use((req, res, next) => {
    console.log("Request from " + req.route);
    console.table(users);
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
});
