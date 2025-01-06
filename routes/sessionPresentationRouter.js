const express = require("express");
const SessionPresentation = require("../models/sessionPresentationSchema");
const router = express.Router();

// POST: Add a new session presentation
router.post("/uploadSession", async (req, res) => {
  try {
    const newSessionPresentation = new SessionPresentation(req.body);
    const savedSessionPresentation = await newSessionPresentation.save();
    res.status(201).json(savedSessionPresentation);
  } catch (error) {
    console.error("Error uploading session presentation:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// GET: Retrieve all session presentations
router.get("/getSession", async (req, res) => {
  try {
    const sessionPresentations = await SessionPresentation.find();
    res.status(200).json(sessionPresentations);
  } catch (error) {
    console.error("Error retrieving session presentations:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// GET: Retrieve a session presentation by ID
router.get("/getSession/:id", async (req, res) => {
  try {
    const sessionPresentation = await SessionPresentation.findById(req.params.id);

    if (!sessionPresentation) {
      return res.status(404).json({ message: "Session presentation not found" });
    }

    res.status(200).json(sessionPresentation);
  } catch (error) {
    console.error("Error retrieving session presentation:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// PUT: Update a session presentation by ID
router.put("/updateSession/:id", async (req, res) => {
  try {
    const updatedSessionPresentation = await SessionPresentation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSessionPresentation) {
      return res.status(404).json({ message: "Session presentation not found" });
    }

    res.status(200).json(updatedSessionPresentation);
  } catch (error) {
    console.error("Error updating session presentation:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// DELETE: Remove a session presentation by ID
router.delete("/deleteSession/:id", async (req, res) => {
  try {
    const deletedSessionPresentation = await SessionPresentation.findByIdAndDelete(req.params.id);

    if (!deletedSessionPresentation) {
      return res.status(404).json({ message: "Session presentation not found" });
    }

    res.status(200).json({ message: "Session presentation deleted successfully" });
  } catch (error) {
    console.error("Error deleting session presentation:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

module.exports = router;
