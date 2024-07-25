const mongoose = require("mongoose");

const ShopUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const ShopUserModel = mongoose.model("users", ShopUserSchema);

module.exports = ShopUserModel;
