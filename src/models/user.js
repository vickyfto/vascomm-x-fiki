const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
