const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Register
router.post("/", userController.createUser);

// Login
router.post("/login", userController.loginUser);

module.exports = router;
