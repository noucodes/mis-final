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

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email OR employee_id
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR employee_id = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.roles },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "✅ Login successful", token, user });
  } catch (err) {
    console.error("❌ Error in loginUser:", err.message);
    res.status(500).json({ error: err.message });
  }
};
