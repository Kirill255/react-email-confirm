const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please Supply an email address"
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", userSchema);
