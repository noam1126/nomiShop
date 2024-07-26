const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/ShopUser.js");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://milisegal123:nomi2468@cluster.loiazet.mongodb.net/usersData";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
