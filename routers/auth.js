const express = require("express");
const createError = require("http-errors");
const Admin = require("../classes/Admin");
const Staff = require("../classes/Staff");
const UserManagement = require("../controllers/userManagement");
const User = require("../model/user");
const router = express.Router();
const jwt = require("../utils/jwt");

router.post("/activate", UserManagement.activateAccount);
router.post("/login", UserManagement.login);
// router.post("/signup", UserManagement.signup);
router.post("/logout", UserManagement.logout);

module.exports = router;
