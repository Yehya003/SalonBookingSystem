const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  appointment: {
    appointmentId: Number,
    appointmentDate: String,
    name: String,
    email: String,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
