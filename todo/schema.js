const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

const TodoModal = mongoose.model("Todo", TodoSchema);
module.exports = TodoModal;
