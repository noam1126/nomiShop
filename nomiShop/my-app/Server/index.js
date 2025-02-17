const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const UserModel = require("./model/ShopUser");
const ItemData = require("./model/ItemData");

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
          // Include user data in the response
          res.json({
            status: "Success",
            user: {
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
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete('/user/:email', (req, res) => {
  const { email } = req.params;
  UserModel.findOneAndDelete({ email: email })
    .then(() => {
      res.json({ message: 'User deleted' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
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

// Add the new endpoint to fetch the latest items
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

app.get('/user/:email', (req, res) => {
  const { email } = req.params;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/test", (req, res) => {
  console.log("test!!!!!");
  return res.json("ok!");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
