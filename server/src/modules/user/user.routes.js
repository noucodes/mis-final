const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

// Register
router.post("/", userController.createUser);

// Login
router.post("/login", userController.loginUser);

module.exports = router;
