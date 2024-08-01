const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String, // Ensure this field is included
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

module.exports = mongoose.model("Cart", CartSchema, "carts");
