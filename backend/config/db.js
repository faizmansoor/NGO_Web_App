import pg from 'pg';  // Default import
import dotenv from 'dotenv';  // Load environment variables before other imports
dotenv.config();

// Use destructuring to get the Client class
const { Client } = pg;


// Create a new instance of the PostgreSQL client
const db = new Client({
  connectionString: process.env.DB_URL,
});

// Connect to the PostgreSQL database
db.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.stack);
  });

export default db;
