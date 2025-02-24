const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true, default: "18" },
  weight: { type: Number, required: true, default: "60" },
  height: { type: Number, required: true, default: "170" },
  activity_level: { type: String, enum: ["niski", "średni", "wysoki"], required: true, default: "średni" },
});

module.exports = mongoose.model("User", userSchema);
