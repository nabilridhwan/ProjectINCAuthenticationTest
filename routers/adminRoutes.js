const express = require("express");
const AdminUserManagement = require("../controllers/adminUserManagement");

const router = express.Router();
const { isUserAdmin } = require("../middlewares/isUserAdmin");

// This route allows for the admin to add a user and assign a name and email to the user. The user then receives an email to activate their account.
router.get("/user", isUserAdmin, AdminUserManagement.getUsers);

module.exports = router;
