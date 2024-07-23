const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const URI = "mongodb+srv://milisegal123:nomi2468@cluster.loiazet.mongodb.net/";
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifieldTopology: true })
  .then(() => console.log("mongoDB connect"))
  .cath((err) => console.log(err));

const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Data = mongoose.model("dataTable", dataSchema);

app.post("/api/data", async (req, res) => {
  const { name, email, password } = req.body;
  const newData = new Data({ name, email, password });
  console.log(newData);

  try {
    const saveData = await newData.save();
    res.json(saveData);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
