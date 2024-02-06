const { Pool } = require('pg');  // Import the Pool object from the pg module
const path = require('path');  // Import the path module for working with file paths

// Load environment variables from Secure.env
require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'Secure.env')
});

// Create a new connection pool with the database credentials from the environment variables
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT),
});
const TABLE=process.env.TABLE;

module.exports={pool, TABLE};