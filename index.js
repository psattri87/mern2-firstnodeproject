require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { data } = require("./db/currency.json");

const currencyRoutes = require("./routes/currency.routes");
const userRoutes = require("./routes/user.routes");
const { verifyAuth } = require("./middlewares/verifyAuth");

const app = express();

const PORT = 3000;
const DB_URI = "mongodb://localhost:27017/test";

mongoose
  .connect(DB_URI)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.use(verifyAuth);
app.use("/currencies", currencyRoutes);
app.use("/users", userRoutes);

app.get("*", (req, res) => res.status(404).send("Invalid url"));

app.listen(PORT, () => {
  console.log("Listening at", PORT);
});
