const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: { type: [CartItemSchema], default: [] },
});

module.exports = mongoose.model("Cart", CartSchema, "carts");
