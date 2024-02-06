// Establishing a connection to a PostgreSQL database using a connection pool

// Step 1: Import the required modules
const express = require('express');  // Import the Express framework
const bodyParser = require('body-parser');  // Import the body-parser middleware
const app = express();  // Create an instance of the Express server
const port = 3000;  // Set the server port to listen on
app.use(bodyParser.json());

// Step 2/3: Create a connection pool/ Define an async function to handle database operations
// Create a new connection pool with the database credentials from the environment variables
const DatabaseOperations = require('./dbQuery');

//============================================================
//*************** POST requests *********************************
//============================================================
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

