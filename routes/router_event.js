const express = require("express");
const router = express.Router();
const Event = require("../models/eventSchema");

// ******************** POST request for uploading data ******************
router.post("/uploadEvent", async (req, res) => {
    try {
        const { title, date_and_time, wing, event_img, description, senior_incharge } = req.body;

        if (!title || !date_and_time || !wing || !event_img || !description || !senior_incharge) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({
            title,
            date_and_time,
            wing,
            event_img,
            description,
            senior_incharge,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// ************************** GET request for retrieving data ************************
router.get("/retrieveEvent", async (req, res) => {
    try {
        const data = await Event.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// ****************************** PUT request for updating data *********************
router.put("/updateEvent/:id", async (req, res) => {
    try {
        const { title, date_and_time, event_img, description, senior_incharge, wing } = req.body;

        const updatedEvent = {
            title,
            date_and_time,
            event_img,
            description,
            senior_incharge,
            wing,
        };

        const data = await Event.findByIdAndUpdate(req.params.id, updatedEvent, { new: true });

        if (!data) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// **************************** DELETE request for deleting data ****************************
router.delete("/deleteEvent/:id", async (req, res) => {
    try {
        const data = await Event.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
