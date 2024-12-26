import express from "express";
import Fundraiser from "../models/Fundraiser.js";
import { verifyAuthToken } from "../middleware/authMiddleware.js";
import { verifyToken } from '../components/cookie.js';
import { verifyToken } from '../components/cookie.js';
import multer from "multer";
const router = express.Router();
import path from "path"; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique file names
  },
});

const upload = multer({ storage });
// Create a new fundraiser
// src/routes/fundraiserRoutes.js

router.post("/", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'qrCodeImage', maxCount: 1 }]), verifyToken, async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files);
    const { name, description } = req.body;

    const imageUrl = req.files.image ? req.files.image[0].path : null;
    const qrCodeImage = req.files.qrCodeImage ? req.files.qrCodeImage[0].path : null;

    if (!name || !description) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Extract ngoId from the decoded token (make sure to adjust this)
    const ngoId = req.user?.userId;  // This assumes  is part of the decoded JWT

    // Create new fundraiser entry
    const newFundraiser = new Fundraiser({
      ngoId,  // Attach ngoId to the fundraiser
      name,
      description,
      image: imageUrl,
      qrCodeImage,
    });

    await newFundraiser.save();

    res.status(201).json({ success: true, data: newFundraiser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating fundraiser", error: err.message });
  }
});

// Get all fundraisers
router.get("/", async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find().select("-ngoId"); // Exclude ngoId from the response
    res.status(200).json({ success: true, data: fundraisers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving fundraisers", error: err.message });
  }
});

// Get fundraisers by NGO
router.get("/ngo/:ngoId", async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find({ ngoId: req.params.ngoId });
    res.status(200).json(fundraisers);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Error retrieving fundraisers for NGO",
        error: err.message,
      });
  }
});

// Get fundraiser by ID
router.get("/:id", async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser)
      return res.status(404).json({ message: "Fundraiser not found" });
    res.status(200).json(fundraiser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving fundraiser", error: err.message });
  }
});

// Update a fundraiser
router.put("/:id", verifyAuthToken, async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);

    if (!fundraiser) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }

    // Check if the logged-in NGO is the creator of the fundraiser
    if (fundraiser.ngoId.toString() !== req.user.toString()) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: You can only update your own fundraisers.",
        });
    }

    const updatedFundraiser = await Fundraiser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedFundraiser);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error updating fundraiser", error: err.message });
  }
});

// Delete a fundraiser
router.delete("/:id", verifyAuthToken, async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);

    if (!fundraiser) {
      return res.status(404).json({ message: "Fundraiser not found" });
    }

    // Check if the logged-in NGO is the creator of the fundraiser
    if (fundraiser.ngoId.toString() !== req.user.toString()) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: You can only delete your own fundraisers.",
        });
    }

    await fundraiser.remove();
    res.status(200).json({ message: "Fundraiser deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting fundraiser", error: err.message });
  }
});

export default router;
