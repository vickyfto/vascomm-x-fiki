const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
});

const authToken = mongoose.model("AuthToken", authSchema);
module.exports = authToken;
