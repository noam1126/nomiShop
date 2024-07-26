const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/ShopUser");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://milisegal123:nomi2468@cluster.loiazet.mongodb.net/user"
);

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
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log("server is running");
});
