const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  roadmaps: [{
    name: { 
        type: String, 
        required: true 
    },
    links: {
        type: String
    },
  }],
  videos: [{
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true,
    }
  }],
  session_presentations: [{
    name: {
        type: String,
        required: true,
    }, 
    url: {
        type: String,
        required: true,
    }
  }],
  inventory: [{
    name_of_project: {
        type: String,
        required: true,
    },
    component: [{
        type: String,
        required: true
    }],
    date_of_return: {
        type: Date,
        required: true,
    }
  }]
});

module.exports = mongoose.model("Resources", resourceSchema);
