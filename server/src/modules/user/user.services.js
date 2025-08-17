const User = require("./user.model");

async function createUserService(name, email, password) {
  return await User.createUser(name, email, password);
}

async function getUsersService() {
  return await User.getAllUsers();
}

module.exports = {
  createUserService,
  getUsersService,
};
