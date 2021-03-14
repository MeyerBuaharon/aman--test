const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const callRoutes = require("./routes/calls");

app.use("/calls", callRoutes);

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to database")
);

app.listen(3000);
