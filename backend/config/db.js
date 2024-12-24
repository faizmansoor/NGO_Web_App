// Load environment variables before other imports
import dotenv from 'dotenv';
dotenv.config();

// Import Mongoose
import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);  // No need for useNewUrlParser and useUnifiedTopology
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDb;
