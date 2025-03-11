//cookie is called authToken contains tokenized NGO id
//didn't handle success.
import express from "express";
import NGO from "../models/NGOs.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyAuthToken } from "../middleware/authMiddleware.js";
const router = express.Router();
import multer from "multer";

const upload = multer({ dest: "uploads/" });

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    contact_number,
    address,
    ngoType,
    websiteLink,
    picUrl,
  } = req.body;
  console.log(req.body);

  try {
    let ngo = await NGO.findOne({ email });
    if (ngo) {
      return res.status(400).json({ message: "NGO already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const ngoData = {
      name,
      email,
      password: hashedPassword,
      contactNo: contact_number,
      address,
      ngoType: ngoType,
      websiteLink: websiteLink,
      picUrl,
    };

    console.log("About to save NGO data:", ngoData);

    ngo = new NGO(ngoData);
    console.log("Created NGO object:", ngo);

    const savedNGO = await ngo.save();
    console.log("Saved NGO:", savedNGO);

    // Create a payload for the JWT
    const payload = { ngoId: ngo._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send the response with the token
    res.cookie("authToken", token, {
      httpOnly: true,
      //secure: true, // Uncomment in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "NGO registered successfully",
      ngo: { name: ngo.name, email: ngo.email },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await NGO.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      //secure: true, //use this in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error (logged)");
  }
});

// Get all NGOs
router.get("/", async (req, res) => {
  try {
    const ngos = await NGO.find().lean();
    const sanitizedNgos = ngos.map(({ email, password, ...ngo }) => ngo);
    res.status(200).json({ success: true, data: sanitizedNgos });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving NGOs",
      error: err.message,
    });
  }
});

// Delete an NGO
router.delete("/:id", verifyAuthToken, async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    if (ngo.createdBy.toString() !== req.user) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only delete your own NGOs" });
    }

    await ngo.remove();
    res.status(200).json({ message: "NGO deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting NGO", error: err.message });
  }
});

export default router;
