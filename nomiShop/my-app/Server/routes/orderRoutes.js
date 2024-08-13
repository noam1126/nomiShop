const express = require("express");
const router = express.Router();
const Order = require("../model/Order"); // Adjust the path as necessary

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

module.exports = router;
