const express = require("express");
const Roadmap = require("../models/roadmapSchema");
const router = express.Router();

// POST: Add a new roadmap
router.post("/uploadRoadmap", async (req, res) => {
  try {
    const newRoadmap = new Roadmap(req.body);
    const savedRoadmap = await newRoadmap.save();
    res.status(201).json(savedRoadmap);
  } catch (error) {
    console.error("Error uploading roadmap:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// GET: Retrieve all roadmaps
router.get("/getRoadmap", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.status(200).json(roadmaps);
  } catch (error) {
    console.error("Error retrieving roadmaps:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// PUT: Update a roadmap by ID
router.put("/updateRoadmap/:id", async (req, res) => {
  try {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    res.status(200).json(updatedRoadmap);
  } catch (error) {
    console.error("Error updating roadmap:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// DELETE: Remove a roadmap by ID
router.delete("/deleteRoadmap/:id", async (req, res) => {
  try {
    const deletedRoadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!deletedRoadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }
    res.status(200).json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    console.error("Error deleting roadmap:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

module.exports = router;
