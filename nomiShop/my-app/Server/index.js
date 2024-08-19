const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const UserModel = require("./model/ShopUser");
const ItemData = require("./model/ItemData");
const Cart = require("./model/CartModel");
const Order = require("./model/Order");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const mongoURI =
  "mongodb+srv://milisegal123:nomi2468@cluster.loiazet.mongodb.net/usersData";

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected successfully"))
  .catch((e) => console.error(e));

console.log("Cart model:", Cart);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({
          status: "Success",
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            address: user.address,
          },
        });
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  console.log("register started...");
  UserModel.create(req.body)
    .then((user) => {
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        address: user.address,
      });
    })
    .catch((err) => res.json(err));
});

app.delete("/user/:email", (req, res) => {
  const { email } = req.params;
  UserModel.findOneAndDelete({ email: email })
    .then(() => {
      res.json({ message: "User deleted" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/newItemPage", upload.single("image"), (req, res) => {
  console.log("add item started...");
  const { userId, name, price, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  if (!userId || !name || !price || !description || !category || !image) {
    return res.status(400).json({
      error: "All fields are required",
      userId: !!userId,
      name: !!name,
      price: !!price,
      description: !!description,
      category: !!category,
      image: !!image,
    });
  }

  ItemData.create({ userId, name, price, description, category, image })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/allItems", (req, res) => {
  ItemData.find()
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/allItems/category/:category", (req, res) => {
  const { category } = req.params;
  ItemData.find({ category })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});

app.get("/item/:id", (req, res) => {
  const { id } = req.params;
  ItemData.findById(id)
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/latestItems", async (req, res) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    const latestItems = await ItemData.find({ createdAt: { $gte: oneDayAgo } });
    res.json(latestItems);
  } catch (error) {
    console.error("Error fetching latest items:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/user/:email", (req, res) => {
  const { email } = req.params;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/shoppingCart/:userId", (req, res) => {
  const { userId } = req.params;

  Cart.findOne({ userId })
    .then((cart) => {
      if (cart) {
        res.json(cart.items);
      } else {
        res.json([]);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/shoppingCart", (req, res) => {
  const { userId, item } = req.body;

  Cart.findOne({ userId })
    .then((cart) => {
      if (cart) {
        // Find the item in the cart
        const existingItem = cart.items.find(
          (cartItem) => cartItem.name === item.name
        );

        if (existingItem) {
          // If the item exists, increment its quantity
          existingItem.quantity += 1;
        } else {
          // If the item does not exist, add it to the cart
          cart.items.push(item);
        }

        return cart.save();
      } else {
        // If the cart does not exist, create a new one
        return Cart.create({ userId, items: [item] });
      }
    })
    .then(() => res.status(200).json("Item added to cart!"))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/shoppingCart/:userId/:itemId", (req, res) => {
  const { userId, itemId } = req.params;
  const { quantity } = req.body;

  Cart.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      const item = cart.items.id(itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found in cart" });
      }

      item.quantity = quantity;
      return cart.save();
    })
    .then(() => res.status(200).json("Item quantity updated!"))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/item/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  ItemData.findById(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Update item details
      item.name = name || item.name;
      item.price = price || item.price;
      item.description = description || item.description;
      item.category = category || item.category;

      if (image) {
        // If a new image is uploaded, replace the old one
        fs.unlinkSync(item.image); // Remove the old image file
        item.image = image;
      }

      return item.save();
    })
    .then((updatedItem) => res.json(updatedItem))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;

  ItemData.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Delete the image file associated with the item
      fs.unlinkSync(item.image);

      // After deleting the item, remove it from all shopping carts
      return Cart.updateMany(
        { "items._id": id }, // Find carts with the item
        { $pull: { items: { _id: id } } } // Remove the item from the cart
      );
    })
    .then(() =>
      res.json({ message: "Item and associated cart entries deleted" })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.get("/itemsForSale/:userId", (req, res) => {
  const { userId } = req.params;

  ItemData.find({ userId: userId })
    .then((items) => {
      if (items.length === 0) {
        return res.status(404).json({ error: "No items found for this user" });
      }
      res.json(items);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.delete("/shoppingCart/:userId/:itemId", (req, res) => {
  const { userId, itemId } = req.params;

  Cart.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
      return cart.save();
    })
    .then(() => res.status(200).json("Item removed from cart!"))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.post("/orders", (req, res) => {
  const { userId, items, date, status } = req.body;

  const newOrder = new Order({
    userId,
    items,
    date,
    status,
  });

  newOrder
    .save()
    .then(() => {
      // Clear the user's cart after placing the order
      return Cart.findOneAndUpdate(
        { userId },
        { items: [] } // Clear cart items
      );
    })
    .then(() => res.status(201).json(newOrder))
    .catch((error) => {
      console.error("Error saving order or clearing cart:", error);
      res.status(500).send("Server Error");
    });
});

// Import and use the order routes
const orderRoutes = require("./routes/orderRoutes");
app.use(orderRoutes);

// Order route handled by `orderRoutes.js` file

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
