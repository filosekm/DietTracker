const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  activity_level: { type: String, enum: ["niski", "średni", "wysoki"], required: true, default: "średni" },
});

module.exports = mongoose.model("User", userSchema);
