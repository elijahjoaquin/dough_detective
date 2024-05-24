const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  confirmPassword: String,
});

const AccountModel = mongoose.model("accounts", AccountSchema);
module.exports = AccountModel;
