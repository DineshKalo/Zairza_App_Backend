const express = require("express");
const router = express.Router();
const Project = require("../models/projectSchema");

// ******************** POST request to create a new project ******************
router.post("/createProject", async (req, res) => {
    try {
        const {
            title,
            date_and_time,
            wing,
            status,
            project_img,
            description,
            senior_incharge,
            links,
        } = req.body;

        if (!title || !date_and_time || !wing || !status || !project_img || !description || !senior_incharge) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const newProject = new Project({
            title,
            date_and_time,
            wing,
            status,
            project_img,
            description,
            senior_incharge,
            links,
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create project", error });
    }
});

// ************************** GET request to retrieve all projects ************************
router.get("/retrieveProjects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve projects", error });
    }
});

// ************************** GET request to retrieve a single project by ID *****************
router.get("/retrieveProject/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve project", error });
    }
});

// ****************************** PUT request to update a project *********************
router.put("/updateProject/:id", async (req, res) => {
    try {
        const {
            title,
            date_and_time,
            wing,
            status,
            project_img,
            description,
            senior_incharge,
            links,
        } = req.body;

        const updatedProject = {
            title,
            date_and_time,
            wing,
            status,
            project_img,
            description,
            senior_incharge,
            links,
        };

        const project = await Project.findByIdAndUpdate(req.params.id, updatedProject, { new: true });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update project", error });
    }
});

// ****************************** DELETE request to remove a project *********************
router.delete("/deleteProject/:id", async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete project", error });
    }
});

module.exports = router;
