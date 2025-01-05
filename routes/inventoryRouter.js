const express = require("express");
const Inventory = require("../models/inventorySchema");
const router = express.Router();

// POST: Add a new inventory item
router.post("/uploadInventory", async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    console.error("Error uploading inventory:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// GET: Retrieve all inventory items
router.get("/getInventory", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error retrieving inventory:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// PUT: Update an inventory item by ID
router.put("/updateInventory/:id", async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// DELETE: Remove an inventory item by ID
router.delete("/deleteInventory/:id", async (req, res) => {
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

module.exports = router;
