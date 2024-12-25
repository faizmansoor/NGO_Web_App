import express from 'express';
import Event from '../models/Events.js';

const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { ngoId, name, date, location, description } = req.body;
    if (!ngoId || !name || !date || !location) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }
    const newEvent = new Event({ ngoId, name, date, location, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating Event', error: err.message });
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
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
});

export default router;
