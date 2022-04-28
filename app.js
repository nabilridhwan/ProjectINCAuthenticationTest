const express = require("express");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const helmet = require("helmet");
const morgan = require("morgan");

// Routes
const authRoutes = require("./routers/auth");
const adminRoutes = require("./routers/adminRoutes");
const adminAuthRoutes = require("./routers/adminAuth");
const devAuthRoutes = require("./routers/devAuth");

const CONFIG = require("./utils/config");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Cookie parser
app.use(cookieParser(CONFIG.COOKIE_SECRET));

// Logging if not in test mode
if (CONFIG.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));

// Prevents HTTP parameter pollution
app.use(hpp());

// Basic security
app.use(helmet());

// Hides the X-Powered-By header
app.use(helmet.hidePoweredBy());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/auth", adminAuthRoutes);
app.use("/api/v1/dev", devAuthRoutes);

app.use(errorHandler);

module.exports = app;
