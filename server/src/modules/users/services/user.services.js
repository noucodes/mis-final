const pool = require("../../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserServices {
  constructor() {
    this.saltRounds = 10; // Define salt rounds for bcrypt
  }

  async createUserService(data) {
    try {
      const { name, email, password, employeeId } = data;
      const role = "admin"; // Default role (consider making configurable)

      // Check if email already exists
      const checkUserEmail = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (checkUserEmail.rows.length > 0) {
        throw new Error("Email already registered");
      }

      // Check if employeeId already exists
      const checkUserId = await pool.query(
        "SELECT * FROM users WHERE employee_id = $1",
        [employeeId]
      );
      if (checkUserId.rows.length > 0) {
        throw new Error("Employee ID already registered");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      const result = await pool.query(
        "INSERT INTO users (name, email, password, role, employee_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, hashedPassword, role, employeeId]
      );

      return { message: "✅ Registered successfully", user: result.rows[0] };
    } catch (err) {
      console.error("❌ Error in createUserService:", err.message);
      throw err; // Let the controller handle the error
    }
  }

  async loginUserService(data) {
    try {
      const { emailOrId, password } = data; // Use a single field for flexibility

      // Find user by email or employee_id
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1 OR employee_id = $1",
        [emailOrId]
      );

      if (result.rows.length === 0) {
        throw new Error("Invalid email/ID or password");
      }

      const user = result.rows[0];

      // Check if suspended
      if (user.suspended) {
        throw new Error("Account suspended. Please contact administrator.");
      }

      // Check if temporarily locked
      if (user.locked_until && new Date(user.locked_until) > new Date()) {
        throw new Error(
          `Account locked. Try again after ${new Date(user.locked_until).toLocaleTimeString()}`
        );
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        let attempts = (user.login_attempts || 0) + 1;
        let lockedUntil = null;
        let suspended = false;

        if (attempts >= 5) {
          suspended = true; // Permanently suspended
        } else if (attempts >= 3) {
          lockedUntil = new Date(Date.now() + 5 * 60 * 1000); // Lock for 5 minutes
        }

        await pool.query(
          "UPDATE users SET login_attempts = $1, locked_until = $2, suspended = $3 WHERE id = $4",
          [attempts, lockedUntil, suspended, user.id]
        );

        if (suspended) {
          throw new Error("Account suspended. Please contact administrator.");
        }
        if (lockedUntil) {
          throw new Error(
            `Too many failed attempts. Try again after ${lockedUntil.toLocaleTimeString()}`
          );
        }
        throw new Error("Invalid email/ID or password");
      }

      // Successful login → reset attempts
      await pool.query(
        "UPDATE users SET login_attempts = 0, locked_until = NULL WHERE id = $1",
        [user.id]
      );

      // Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.name,
          employeeId: user.employee_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { message: "✅ Login successful", token, user };
    } catch (err) {
      console.error("❌ Error in loginUserService:", err.message);
      throw err;
    }
  }

  async getUserService(data) {
    try {
      const id = data;
      const result = await pool.query("SELECT * FROM users WHERE id = $1",[id]);
      return result.rows;
    } catch (err) {
      console.error("❌ Error in getUsersService:", err.message);
      throw err;
    }
  }
}

module.exports = new UserServices();