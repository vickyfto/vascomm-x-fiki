require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
app.use(cors());

const port = 3000;
const url = process.env.DB_URL;

mongoose.connect(url, {
  dbName: "db-interview",
});
const con = mongoose.connection;
app.use(express.json());

try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

const user = require("./src/routes/user");
const auth = require("./src/routes/auth");
const product = require("./src/routes/product");

app.use("/user", user);
app.use("/auth", auth);
app.use("/product", product);

app.listen(port, () => {
  console.log("Server started");
});
