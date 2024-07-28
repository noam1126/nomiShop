const mongoose = require("mongoose");

const ItemDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Use Number for prices
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ItemData = mongoose.model("ItemData", ItemDataSchema, "ItemsData");

module.exports = ItemData;
