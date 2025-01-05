const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");

// ******************** POST: Create a new blog ********************
router.post("/createBlog", async (req, res) => {
  try {
    const { title, description, wing, image, links } = req.body;

    const newBlog = new Blog({
      title,
      description,
      wing,
      image,
      links,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", data: savedBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
});

// ******************** GET: Retrieve all blogs ********************
router.get("/getBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ data: blogs });
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res.status(500).json({ error: error.message });
  }
});

// ******************** GET: Retrieve a blog by ID ********************
router.get("/getBlog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog retrieved successfully", data: blog });
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).json({ message: "Failed to retrieve blog", error: error.message });
  }
});

// ******************** PUT: Update a blog by ID ********************
router.put("/updateBlog/:id", async (req, res) => {
  try {
    const { title, description, wing, image, links } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, wing, image, links },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Failed to update blog", error: error.message });
  }
});

// ******************** DELETE: Delete a blog by ID ********************
router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully", data: deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
});

module.exports = router;
