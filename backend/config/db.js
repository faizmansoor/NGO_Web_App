import pg from 'pg';  // Default import
import dotenv from 'dotenv';  // Load environment variables before other imports
dotenv.config();

// Use destructuring to get the Client class
const { Client } = pg;


// Create a new instance of the PostgreSQL client
const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
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
