require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const { connectDB, sequelize } = require("./src/config/db");
const User = require("./src/modules/user/user.model");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); // creates/updates tables automatically

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
