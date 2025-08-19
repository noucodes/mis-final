const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // <-- add JWT
const saltRounds = 10;

// Register User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, employeeid } = req.body;
    const role = "admin"; // default role (change manually if needed)

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if email already exists
    const checkUserEmail = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkUserEmail.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const checkUserId = await pool.query("SELECT * FROM users WHERE employee_id = $1", [
      employeeid,
    ]);
    if (checkUserId.rows.length > 0) {
      return res.status(400).json({ error: "Employee ID already registered" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role, employee_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPassword, role, employeeid]
    );

    res
      .status(201)
      .json({ message: "✅ Registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("❌ Error in createUser:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR employee_id = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email/ID or password" });
    }

    const user = result.rows[0];

    // 🔹 Check if suspended
    if (user.suspended) {
      return res.status(403).json({
        error: "Account suspended. Please contact administrator.",
      });
    }

    // 🔹 Check if temporarily locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(403).json({
        error: `Account locked. Try again after ${new Date(
          user.locked_until
        ).toLocaleTimeString()}`,
      });
    }

    // 🔹 Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      let attempts = user.login_attempts + 1;
      let lockedUntil = null;
      let suspended = false;

      if (attempts >= 5) {
        suspended = true; // 🚨 permanently suspended
      } else if (attempts >= 3) {
        lockedUntil = new Date(Date.now() + 5 * 60 * 1000); // lock 5 minutes
      }

      await pool.query(
        "UPDATE users SET login_attempts = $1, locked_until = $2, suspended = $3 WHERE id = $4",
        [attempts, lockedUntil, suspended, user.id]
      );

      if (suspended) {
        return res
          .status(403)
          .json({ error: "Account suspended. Please contact administrator." });
      }

      if (lockedUntil) {
        return res.status(403).json({
          error: `Too many failed attempts. Try again after ${lockedUntil.toLocaleTimeString()}`,
        });
      }

      return res.status(401).json({ error: "Invalid email/ID or password" });
    }

    // 🔹 Successful login → reset attempts
    await pool.query(
      "UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = $1",
      [user.id]
    );

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, name: user.name,  employeeid: user.employee_id},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "✅ Login successful", token, user });
  } catch (err) {
    console.error("❌ Error in loginUser:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR employee_id = $1",
      [email]
    );
}
