const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  links: {
    type: String
  }
});

module.exports = mongoose.model("Roadmap", roadmapSchema);