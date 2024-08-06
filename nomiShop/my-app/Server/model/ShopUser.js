const mongoose = require("mongoose");
const ItemData = require("./ItemData");

const ShopUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  buyerOrSeller: {
    type: String,
    required: true,
  },
});

const ShopUser = mongoose.model("ShopUser", ShopUserSchema, "usersData");

module.exports = ShopUser;
