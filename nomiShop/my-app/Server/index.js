const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const UserModel = require("./model/ShopUser");
const ItemData = require("./model/ItemData");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer
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

app.post("/itemPage", upload.single("image"), (req, res) => {
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

app.get("/test", (req, res) => {
  console.log("test!!!!!");
  return res.json("ok!");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
