const mongoose = require("mongoose");
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

// Pre-save middleware to increment the userID
ShopUserSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "userID" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.userID = counter.sequence_value;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const ShopUser = mongoose.model("ShopUser", ShopUserSchema, "usersData");

module.exports = ShopUser;
