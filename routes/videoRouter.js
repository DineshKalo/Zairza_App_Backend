const express = require("express");
const Video = require("../models/videoSchema");
const router = express.Router();

// POST: Add a new video
router.post("/uploadVideo", async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// GET: Retrieve all videos
router.get("/getVideos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// GET: Retrieve a video by ID
router.get("/getVideo/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error("Error retrieving video:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// PUT: Update a video by ID
router.put("/updateVideo/:id", async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// DELETE: Remove a video by ID
router.delete("/deleteVideo/:id", async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

module.exports = router;
