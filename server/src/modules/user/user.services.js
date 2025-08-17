const User = require("./user.model");

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.createUser = async (data) => {
  return await User.create(data);
};
