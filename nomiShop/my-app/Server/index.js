const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/ShopUser.js");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://milisegal123:nomi2468@cluster.loiazet.mongodb.net/usersData";

mongoose
  .connect(mongoURI)
  .then((x) => console.log("connected successfully"))
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

app.get("/test", (req, res) => {
  console.log("test!!!!!");
  return res.json("ok!");
});

app.listen(3001, () => {
  console.log("server is running");
});
