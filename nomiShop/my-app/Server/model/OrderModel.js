const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData', // Ensure it matches the name of your user model
    required: true
  },
  items: [
    {
      product: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const OrderModel = mongoose.model('OrderModel', OrderSchema);

module.exports = OrderModel;
