const pool = require("../../config/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Register User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Hash password with await
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error in createUser:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First, find the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // ✅ Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // At this point login is successful
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Error in loginUser:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
