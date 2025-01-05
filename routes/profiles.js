const express = require("express");
const router = express.Router();
const profiles = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { multerMiddleware } = require("../middlewares/photo_transfer");

// ****************** Upload Profile ******************
router.post("/uploadProfile", multerMiddleware, async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (userId !== req.body.zairza_id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only upload your own profile data" });
    }

    const {
      first_name,
      last_name,
      registration_number,
      branch,
      phone_number,
      email,
      skills,
      projects,
      internships,
      batch,
      blogs,
      social_handles,
      achievements,
    } = req.body;

    const newProfile = new profiles({
      first_name,
      last_name,
      registration_number,
      branch,
      phone_number,
      email,
      skills: Array.isArray(skills) ? skills : [],
      projects: Array.isArray(projects) ? projects : [],
      internships: Array.isArray(internships) ? internships : [],
      batch,
      blogs: Array.isArray(blogs) ? blogs : [],
      social_handles: Array.isArray(social_handles) ? social_handles : [],
      achievements: Array.isArray(achievements) ? achievements : [],
      zairza_id: req.body.zairza_id,
      photoUrl: req.file ? req.file.path : undefined, // Use multer's uploaded file path
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error uploading profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// ****************** Retrieve Profile ******************
router.get("/getProfile", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.zairza_id;

    const profile = await profiles.findOne({zairza_id:userId});
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// ****************** Update Profile ******************
router.put("/updateProfile", multerMiddleware, async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const updates = req.body;
    if (req.file) {
      updates.photoUrl = req.file.path; // Update photo if uploaded
    }

    const updatedProfile = await profiles.findOneAndUpdate(
      { zairza_id: userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

// ****************** Delete Profile ******************
router.delete("/deleteProfile", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const deletedProfile = await profiles.findOneAndDelete({ zairza_id: userId });
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.toString() });
  }
});

module.exports = router;
