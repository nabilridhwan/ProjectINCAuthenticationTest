const express = require("express");
const UserManagement = require("../controllers/userManagement");

const router = express.Router();

router.post("/activate/:guid", UserManagement.activateAccount);
router.post("/login", UserManagement.login);
// router.post("/signup", UserManagement.signup);
router.post("/logout", UserManagement.logout);

module.exports = router;
