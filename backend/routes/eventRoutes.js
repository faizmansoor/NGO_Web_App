import express from 'express';
import Event from '../models/Events.js';
import { verifyAuthToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new event
router.post('/', verifyAuthToken, async (req, res) => {
  try {
    const { ngoId, name, date, location, description } = req.body;

    if (!ngoId || !name || !date || !location) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    // Ensure the logged-in NGO is the one creating the event
    if (req.user !== ngoId) {
      return res.status(403).json({ message: 'Unauthorized: You can only create events for your own NGO.' });
    }

    const newEvent = new Event({ ngoId, name, date, location, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating event', error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving events', error: err.message });
  }
});

// Get events by NGO
router.get('/ngo/:ngoId', async (req, res) => {
  try {
    const events = await Event.find({ ngoId: req.params.ngoId });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving events for NGO', error: err.message });
  }
});

// Update an event
router.put('/:id', verifyAuthToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the logged-in NGO is the creator of the event
    if (event.ngoId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You can only update your own events.' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
});

// Delete an event
router.delete('/:id', verifyAuthToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the logged-in NGO is the creator of the event
    if (event.ngoId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You can only delete your own events.' });
    }

    await event.remove();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
});

export default router;
