const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: String,
    id: String,
    todo: String,
    completed: Boolean,
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Todo", todoSchema);
