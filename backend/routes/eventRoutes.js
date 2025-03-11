import express from "express";
import Event from "../models/Events.js";
import NGO from "../models/NGOs.js";
import { verifyAuthToken } from "../middleware/authMiddleware.js";
import { verifyToken } from "../components/cookie.js";

const router = express.Router();

// Create a new event
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      event,
      participants,
      eligibility,
      location,
      description,
      volunteerLink,
    } = req.body;

    if (!event || !location || !description) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Extract `ngoId` (userId) from the authenticated user's cookie

    const ngoId = req.user?.ngoId;
    console.log("ngoId is: ", ngoId);

    // Fetch `ngoName` from the database using `ngoId`
    const ngo = await NGO.findById(ngoId).select("name");
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found." });
    }
    const ngoName = ngo.name;
    console.log("ngoName is ", ngoName);

    const newEvent = new Event({
      ngoId,
      name: event,
      ngoName,
      location,
      description,
      participants,
      eligibility,
      volunteerLink,
    });

    await newEvent.save();

    res.status(201).json({ success: true, data: newEvent });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error creating event", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().select("-ngoId");
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving events",
      error: err.message,
    });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;

    const events = await Event.find({ ngoId: loggedInUserId });

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching events", error: err.message });
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

// Delete an event

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    console.log(event);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in NGO is the creator of the event
    console.log("Logged-in user:", req.user);
    if (event.ngoId.toString() !== req.user.userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this event" });
    }

    // Delete the event
    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting event", error: err.message });
  }
});

export default router;
