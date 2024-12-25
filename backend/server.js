import dotenv from 'dotenv';  
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/db.js'; 
import bcrypt from 'bcryptjs';
import NGO from "./models/NGOs.js";
import Event from './models/Events.js';
import ngoRoutes from './routes/ngoRoutes.js';
import eventRoutes from './routes/eventRoutes.js';


const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));  // Log HTTP requests
app.use(express.json());  // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// Routes
app.use('/api/ngo', ngoRoutes);
app.use('/api/event', eventRoutes);

// Connect to MongoDB
const startServer = async () => {
  try {
    await connectDb();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit process if the connection fails
  }
};

// Call the start server function
startServer();

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Server is running...');
});