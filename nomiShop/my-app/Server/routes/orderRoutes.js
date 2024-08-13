const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

// Route to handle order creation
router.post("/orders", (req, res) => {
  const newOrder = new Order(req.body);

  newOrder
    .save()
    .then((order) => res.status(201).json(order))
    .catch((error) =>
      res.status(400).json({ error: "Error saving order", details: error })
    );
});

router.get("/orders/:userId", (req, res) => {
  const { userId } = req.params;

  Order.find({ userId })
    .then((orders) => {
      if (orders.length === 0) {
        return res.status(404).json({ error: "No orders found for this user" });
      }
      res.json(orders);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
