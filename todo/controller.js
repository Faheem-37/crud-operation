const express = require("express");
const todoRoutes = express.Router();
const bodyParser = require("body-parser");
const TodoModal = require("./schema");

todoRoutes.use(bodyParser.json());
////server checking
todoRoutes.route("/").get(async (req, res) => {
  res.status(200).send("Server is Running on Full Speed");
});

///add todos
todoRoutes.route("/add").post(async (req, res) => {
  let todoRecord = new TodoModal(req.body);
  await todoRecord
    .save()
    .then((todo) => {
      res.status(200).json({ todoRecord: "Record save successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new record failed");
    });
});
// get all todos
todoRoutes.route("/getAllTodos").get(async (req, res) => {
  TodoModal.find((err, todos) => {
    if (err) {
      res.status(400).send("error :" + err);
    } else {
      res.status(200).json(todos);
    }
  });
});

//// get by id
todoRoutes.route("/:id").get(async (req, res) => {
  let id = req.params.id;
  TodoModal.findById(id, (err, todoList) => {
    if (err) {
      res.send("id isn't valid");
    } else {
      res.status(200).send(todoList);
    }
  });
});

////update
todoRoutes.route("/update/:id").patch(async (req, res) => {
  let id = req.params.id;
  TodoModal.findById(id, (err, todo) => {
    if (!todo) {
      res.status(400).send("data is not found");
    } else {
      todo.name = req.body.name;
      todo.address = req.body.address;
      todo.phone = req.body.phone;
      todo
        .save()
        .then((todo) => {
          res.status(200).json(todo);
        })
        .catch((err) => {
          res.status(400).send("data isn't updated!");
        });
    }
  });
});

///delete

todoRoutes.route("/delete/:id").delete(async (req, res) => {
  let id = req.params.id;
  console.log("id", id);
  TodoModal.findByIdAndRemove(id)
    .then((todoList) => {
      console.log("todoList", todoList);
      res.status(200).send("record deleted");
    })
    .catch((err) => {
      res.status(400).send("record not found");
    });
});
module.exports = todoRoutes;
