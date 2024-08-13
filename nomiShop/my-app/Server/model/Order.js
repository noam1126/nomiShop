const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema, "ordersData");
