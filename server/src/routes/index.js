const express = require("express");
const router = express.Router();
const userRoutes = require("../modules/user/user.routes");
const authMiddleware = require("../middlewares/auth");

router.use("/users", userRoutes);

// Example protected route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}` });
});

module.exports = router;
