const mongoose = require("mongoose");

const callSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Calls", callSchema);
