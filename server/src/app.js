const express = require("express");
const routes = require("./routes"); // this works because routes is inside src/
const { initUserTable } = require("./modules/user/user.model");

const app = express();
app.use(express.json());

// API routes
app.use("/api", routes);

// Initialize DB tables
initUserTable()
  .then(() => {
    console.log("✅ Users table ready");
  })
  .catch((err) => {
    console.error("❌ Error initializing DB:", err);
  });

module.exports = app;
