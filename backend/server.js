import dotenv from 'dotenv';  // Load environment variables before other imports
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/db.js';  // Import the MongoDB connection function
import bcrypt from 'bcryptjs';

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));  // Log HTTP requests
app.use(express.json());  // Parse JSON request body

// Connect to MongoDB
const startServer = async () => {
  try {
    // Connect to the database
    await connectDb();
    
    // After successful connection, start the server
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

// Add other routes here
// For example:
// app.use('/users', userRoutes); // Import your route handlers here
