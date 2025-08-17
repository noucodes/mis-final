const pool = require("../../config/db");

// Create table if not exists
async function initUserTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function createUser(name, email, password) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
}

async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}

module.exports = {
  initUserTable,
  createUser,
  getAllUsers,
};
