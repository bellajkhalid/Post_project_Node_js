const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'Secure.env')
});

const app = express();
const port = 3000;

(async () => {
  const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  try {
    const client = await pool.connect();
    // You can use the client object to perform database operations here

    // Remember to release the client when you're done, to return it to the pool
    client.release();
  } catch (err) {
    console.error('Error while connecting to the database:', err);
  } finally {
    // Make sure to destroy the pool after you're done using it
    pool.end();
  }
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rest of your Express app configuration and routes