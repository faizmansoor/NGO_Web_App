import express from "express";
import Event from "../models/Events.js";
import NGO from "../models/NGOs.js";
import { verifyAuthToken } from "../middleware/authMiddleware.js";
import { verifyToken } from '../components/cookie.js';

const router = express.Router();

// Create a new event
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { event, participants, eligibility, location, description, volunteerLink } = req.body;

    if (!event || !location || !description) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Extract `ngoId` (userId) from the authenticated user's cookie
    const ngoId = req.user?.userId;
    console.log(ngoId);

    // Fetch `ngoName` from the database using `ngoId`
    const ngo = await NGO.findById(ngoId).select("name");
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found." });
    }
    const ngoName = ngo.name;
    console.log(ngoName);

    // Create new event without image
    const newEvent = new Event({
      ngoId,
      name: event, // Map `event` to `name`
      ngoName,
      location,
      description,
      participants,
      eligibility,
      volunteerLink,
      
    });

    // Save event to database
    await newEvent.save();

    // Respond with the created event
    res.status(201).json({ success: true, data: newEvent });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating event", error: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().select("-ngoId"); // Exclude ngoId
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error retrieving events",
        error: err.message,
      });
  }
});

// Get events by NGO
router.get("/ngo/:ngoId", async (req, res) => {
  try {
    const events = await Event.find({ ngoId: req.params.ngoId });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving events for NGO", error: err.message });
  }
});

// Update an event
router.put("/:id", verifyAuthToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in NGO is the creator of the event
    if (event.ngoId.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "Unauthorized: You can only update your own events.",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error updating event", error: err.message });
  }
});

// Delete an event
router.delete("/:id", verifyAuthToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in NGO is the creator of the event
    if (event.ngoId.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "Unauthorized: You can only delete your own events.",
      });
    }

    await event.remove();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting event", error: err.message });
  }
});

export default router;
