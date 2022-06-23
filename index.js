const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Connection = require("./todo/server");
const TodoModal = require("./todo/schema");
const todoRoutes = require("./todo/controller");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", todoRoutes);

app.listen(port, () => {
  TodoModal();
  Connection();
  console.log("server is running on port : " + port);
});
