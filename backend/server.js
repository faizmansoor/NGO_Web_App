import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import connectDb from "./config/db.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import fundraiserRoutes from "./routes/FundraiserRoutes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import jwt from 'jsonwebtoken';


const app = express();

//connect to mongodb
connectDb();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  credentials: true, // Allow cookies to be sent with the request
}));
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/ngos", ngoRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/fundraisers", fundraiserRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get('/check-auth', (req, res) => {
  console.log(req.cookies); 

  const token = req.cookies.authToken;  // The cookie is automatically parsed by cookie-parser middleware

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isAuthenticated: false });
    }

    res.json({ isAuthenticated: true });
  });
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is walking on port ${port}`);
});
