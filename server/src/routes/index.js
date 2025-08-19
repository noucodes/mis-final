const express = require("express");
const router = express.Router();
const userRoutes = require("../modules/users/routes/user.routes");
const personalInfoRoutes = require("../modules/personal_info/routes/personalInfo.routes");
const authMiddleware = require("../middlewares/auth");

router.use("/users", userRoutes);

// Mount personal info routes
router.use("/personal-info", personalInfoRoutes); // New route mounting

// Protected dashboard route
router.get("/dashboard", authMiddleware, (req, res) => {
  try {
    res.json({ message: `Welcome to your dashboard, ${req.user.email}` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    employeeid: req.user.employeeid,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
