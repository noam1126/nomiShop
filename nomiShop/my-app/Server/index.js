const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const UserModel = require("./model/ShopUser");
const ItemData = require("./model/ItemData");
const Cart = require("./model/CartModel");

const app = express();
app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

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

// Existing routes...

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
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
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/newItemPage", upload.single("image"), (req, res) => {
  console.log("add item started...");
  const { name, price, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !price || !description || !category || !image) {
    return res.status(400).json({
      error: "All fields are required",
      name: !!name,
      price: !!price,
      description: !!description,
      category: !!category,
      image: !!image,
    });
  }

  ItemData.create({ name, price, description, category, image })
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

app.get("/shoppingCart/:userId", (req, res) => {
  const { userId } = req.params;

  Cart.find({ userId })
    .then((cartItems) => res.json(cartItems))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// app.post("/shoppingCart", (req, res) => {
//   const { item } = req.body;
//   if (!item) {
//     return res.status(400).json({ error: "Item is required" });
//   }
//   CartModel.create(item)
//     .then((cartItem) => res.json(cartItem))
//     .catch((err) => res.status(500).json({ error: err.message }));
// });

app.post("/shoppingCart", (req, res) => {
  const { userId, item } = req.body; // Expect userId and item details

  const cartItem = new Cart({
    userId,
    name: item.name,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.image,
  });

  cartItem
    .save()
    .then(() => res.status(200).json("Item added to cart!"))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/test", (req, res) => {
  console.log("test!!!!!");
  return res.json("ok!");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
