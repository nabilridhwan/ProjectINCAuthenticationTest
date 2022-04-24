const express = require("express");
const router = express.Router();

const UserManagement = require("../controllers/userManagement");

// Create an endpoint which decodes the token and returns the decoded data and get the type of the token (either from normal or register) from the query.
router.get("/", UserManagement.getUserDetails);

module.exports = router;
