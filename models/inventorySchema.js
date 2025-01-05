const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Inventory", inventorySchema);