const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Register
router.post("/register", userController.createUser);

// Login
router.post("/login", userController.loginUser);

// Login
router.get("/:id", userController.getUser);

module.exports = router;
