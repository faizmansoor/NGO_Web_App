import express from 'express';
import Fundraiser from '../models/Fundraiser.js';

const router = express.Router();



// Create a new fundraiser
router.post('/', async (req, res) => {
  try {
    const { ngoId, name, description, imageUrl, qrCodeImage } = req.body;

    if (!ngoId || !name || !description) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newFundraiser = new Fundraiser({ ngoId, name, description, imageUrl, qrCodeImage });
    await newFundraiser.save();
    res.status(201).json(newFundraiser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating Fundraiser', error: err.message });
  }
});

// Get all fundraisers
router.get('/', async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find();
    res.status(200).json(fundraisers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving fundraisers', error: err.message });
  }
});

// Get fundraisers by NGO
router.get('/ngo/:ngoId', async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find({ ngoId: req.params.ngoId });
    res.status(200).json(fundraisers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving fundraisers for NGO', error: err.message });
  }
});

// Get fundraiser by ID
router.get('/:id', async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' });
    res.status(200).json(fundraiser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving fundraiser', error: err.message });
  }
});

// Update a fundraiser
router.put('/:id', async (req, res) => {
  try {
    const updatedFundraiser = await Fundraiser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFundraiser) return res.status(404).json({ message: 'Fundraiser not found' });
    res.status(200).json(updatedFundraiser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating fundraiser', error: err.message });
  }
});

// Delete a fundraiser
router.delete('/:id', async (req, res) => {
  try {
    const deletedFundraiser = await Fundraiser.findByIdAndDelete(req.params.id);
    if (!deletedFundraiser) return res.status(404).json({ message: 'Fundraiser not found' });
    res.status(200).json({ message: 'Fundraiser deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting fundraiser', error: err.message });
  }
});

export default router;
