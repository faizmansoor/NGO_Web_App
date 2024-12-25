import express from 'express';
import NGO from '../models/NGOs.js';

const router = express.Router();

// Create a new NGO
router.post('/', async (req, res) => {
  try {
    const { name, email, address, contactNo, fundraisingLink, websiteLink, picUrl } = req.body;
    if (!name || !email || !address || !contactNo || !websiteLink) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }
    const newNgo = new NGO({ name, email, address, contactNo, fundraisingLink, websiteLink, picUrl });
    await newNgo.save();
    res.status(201).json(newNgo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating NGO', error: err.message });
  }
});

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    const { ngoType } = req.query;
    const ngos = await NGO.find(ngoType ? { ngoType } : {});
    res.status(200).json(ngos);
  } catch (err) {
    console.error('Error fetching NGOs:', err.message);
    res.status(500).json({ message: 'Error fetching NGOs', error: err.message });
  }
});

// Get a specific NGO
router.get('/:id', async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: 'NGO not found' });
    res.status(200).json(ngo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving NGO', error: err.message });
  }
});


// Search NGOs by name (case-insensitive)
// Search NGOs by name(do in frontend)
// router.get('/search', async (req, res) => {
//     try {
//       const { name } = req.query;
//       if (!name) {
//         return res.status(400).json({ message: 'Name query parameter is required.' });
//       }
      
//       // Perform case-insensitive search for NGOs that match the name
//       const ngos = await NGO.find({
//         name: { $regex: name, $options: 'i' }  // 'i' for case-insensitive
//       });
      
//       if (ngos.length === 0) {
//         return res.status(404).json({ message: `No NGOs found with name containing '${name}'` });
//       }
      
//       res.status(200).json(ngos);
//     } catch (err) {
//       console.error('Error retrieving NGOs:', err.message);
//       res.status(500).json({ message: 'Error retrieving NGO', error: err.message });
//     }
//   });
  
  
router.get('/api/ngo/type/:type', async (req, res) => {
    try {
      const { type } = req.params;  // Get the type from the request parameter
  
      // Validate that the type is one of the allowed values
      const validTypes = ['Health', 'Education', 'Environment', 'Community', 'Others'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid NGO type' });
      }
  
      // Find NGOs that match the provided type
      const ngos = await NGO.find({ ngoType: type });
  
      if (ngos.length === 0) {
        return res.status(404).json({ message: `No NGOs found for type ${type}` });
      }
  
      res.status(200).json(ngos);  // Send the filtered NGOs as a response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving NGOs by type', error: err.message });
    }
  });
  

// Update an NGO
router.put('/:id', async (req, res) => {
  try {
    const updatedNgo = await NGO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNgo) return res.status(404).json({ message: 'NGO not found' });
    res.status(200).json(updatedNgo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating NGO', error: err.message });
  }
});

// Delete an NGO
router.delete('/:id', async (req, res) => {
  try {
    const deletedNgo = await NGO.findByIdAndDelete(req.params.id);
    if (!deletedNgo) return res.status(404).json({ message: 'NGO not found' });
    res.status(200).json({ message: 'NGO deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting NGO', error: err.message });
  }
});

export default router;
