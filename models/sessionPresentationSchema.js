const mongoose = require("mongoose");

const sessionPresentationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  url: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("SessionPresentation", sessionPresentationSchema);