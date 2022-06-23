const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Connection = async () => {
  mongoose.connect(
    "mongodb+srv://Todo:todo123@cluster0.lcqsaz0.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("database connection established successfully");
  });
};
module.exports = Connection;
