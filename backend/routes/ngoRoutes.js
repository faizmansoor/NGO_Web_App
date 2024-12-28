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
    ngo_type,
    websiteLink,
    picUrl, // This will now be a URL from FreeImage
  } = req.body;
  console.log(req.body);

  try {
    // Check if the NGO already exists
    let ngo = await NGO.findOne({ email });
    if (ngo) {
      return res.status(400).json({ message: "NGO already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    ngo = new NGO({
      name,
      email,
      password: hashedPassword,
      contactNo: contact_number,
      address,
      ngoType: ngo_type, // Match the schema
      websiteLink,
      picUrl, // Save the URL directly
    });

    await ngo.save();

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
    // Find user
    let user = await NGO.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a payload for the JWT
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the JWT as a cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      //secure: true, //use this in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send response with user data (optional)
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

// Update an NGO
// router.put("/:id", verifyAuthToken, async (req, res) => {
//   try {
//     const ngo = await NGO.findById(req.params.id);

//     if (!ngo) {
//       return res.status(404).json({ message: "NGO not found" });
//     }

//     // Check if the logged-in user is the creator of the NGO
//     if (ngo.createdBy.toString() !== req.user) {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized: You can only edit your own NGOs" });
//     }

//     const updatedNgo = await NGO.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedNgo);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error updating NGO", error: err.message });
//   }
// });

// Delete an NGO
router.delete("/:id", verifyAuthToken, async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    // Check if the logged-in user is the creator of the NGO
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

// router.post('/', verifyAuthToken, async (req, res) => {
//   // Only logged-in users can create NGOs
//   try {
//     const { name, email, address, contactNo, websiteLink, picUrl } = req.body;

//     if (!name || !email || !address || !contactNo || !websiteLink) {
//       return res.status(400).json({ message: 'Required fields are missing.' });
//     }

//     const newNgo = new NGO({
//       name,
//       email,
//       address,
//       contactNo,
//       websiteLink,
//       picUrl,
//       createdBy: req.user, // Assign the logged-in user's ID as the creator
//     });

//     await newNgo.save();
//     res.status(201).json({ message: 'NGO created successfully', newNgo });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error creating NGO', error: err.message });
//   }
// });

// Get a specific NGO
// router.get('/:id', async (req, res) => {
//   try {
//     const ngo = await NGO.findById(req.params.id);
//     if (!ngo) return res.status(404).json({ message: 'NGO not found' });
//     res.status(200).json(ngo);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving NGO', error: err.message });
//   }
// });

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

// router.get('/api/ngo/type/:type', async (req, res) => {
//     try {
//       const { type } = req.params;  // Get the type from the request parameter

//       // Validate that the type is one of the allowed values
//       const validTypes = ['Health', 'Education', 'Environment', 'Community', 'Others'];
//       if (!validTypes.includes(type)) {
//         return res.status(400).json({ message: 'Invalid NGO type' });
//       }

//       // Find NGOs that match the provided type
//       const ngos = await NGO.find({ ngoType: type });

//       if (ngos.length === 0) {
//         return res.status(404).json({ message: `No NGOs found for type ${type}` });
//       }

//       res.status(200).json(ngos);  // Send the filtered NGOs as a response
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error retrieving NGOs by type', error: err.message });
//     }
//   });
