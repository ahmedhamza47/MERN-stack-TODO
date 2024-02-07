// Create a new Counter model
const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: String,
  value: { type: Number, default: 1 },
});

module.exports = mongoose.model("Counter", CounterSchema);
