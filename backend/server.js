import dotenv from 'dotenv';  
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/db.js'; 
import bcrypt from 'bcryptjs';
import ngoRoutes from './routes/ngoRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

//connect to mongodb
connectDb();

// Middlewares
app.use(cors());
app.use(morgan('dev'));  // Log HTTP requests
app.use(express.json());  // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use('/api/ngo', ngoRoutes);
app.use('/api/event', eventRoutes);

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Server is running...');
});

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Server is walking on port ${port}`)
});