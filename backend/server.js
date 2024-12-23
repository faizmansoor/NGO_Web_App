import dotenv from 'dotenv';  // Load environment variables before other imports
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import db from './config/db.js';   // Import the db.js file
import bcrypt from "bcryptjs";


// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));  // Log HTTP requests
app.use(express.json());  // Parse JSON request body

// Test database connection using async/await
const testDbConnection = async () => {
  try {
    const res = await db.query('SELECT NOW()');  // Check the current time from PostgreSQL
    console.log('Connected to the database:', res.rows[0]);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

// Call the test function
testDbConnection();

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Add other routes here
// For example:
// app.use('/users', userRoutes); // Later, you'll import your routes here

// Define server port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
