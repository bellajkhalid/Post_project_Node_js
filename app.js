// Establishing a connection to a PostgreSQL database using a connection pool

// Step 1: Import the required modules
const express = require('express');  // Import the Express framework
const bodyParser = require('body-parser');  // Import the body-parser middleware
const { Pool } = require('pg');  // Import the Pool object from the pg module
const path = require('path');  // Import the path module for working with file paths

// Load environment variables from Secure.env
require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'Secure.env')
});

const app = express();  // Create an instance of the Express server
const port = 3000;  // Set the server port to listen on
app.use(bodyParser.json());

// Step 2: Create a connection pool
// Create a new connection pool with the database credentials from the environment variables
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT),
});

//===============================================================================
// Step 3: Define an async function to handle database operations
async function DatabaseOperations(a, b, results,res) {
  let client;
  try {
    // Step 4: Acquire a client from the connection pool
    client = await pool.connect();
    pool.query(`INSERT INTO ${process.env.TABLE} (a, b, ab) VALUES ($1, $2, $3)`, [a, b, results], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Sum of ${a} and ${b} is ${results} saved in the database`);
    });

    // Step 6: Release the client back to the connection poolol
    client.release();
  } catch (err) {
    console.error('Error while connecting to the database:', err);
  } finally {

    console.error('no Error while connecting to the database:');
    pool.end();
  }
}
//============================================================
//POST requests
app.post('/sum', (req, res) => {
  const { a, b } = req.body;
  const results = parseInt(a) + parseInt(b);
  // Step 7: Call the async function to handle database operations
  DatabaseOperations(a, b, results,res)
    .then(() => {
      console.log('Database operations complete');
      })
    .catch((error) => {
      console.error(error);
    });
});
//=========================================================================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// handling both JSON data and URL-encoded data in the request bodies
app.use(bodyParser.json());  // Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: false }));  // Parse incoming URL-encoded data

