const { pool, TABLE } = require('./db');

//======================================================
// Function to handle POST request and insert data to the database
async function dataPost(a, b, results, res) {
    try {
        // Connect to the database
        const client = await pool.connect();
        
        // Execute the SQL query to insert data into the table
        await pool.query(`INSERT INTO ${TABLE} (a, b, ab) VALUES ($1, $2, $3)`, [a, b, results]);
        
        // Release the database client connection
        client.release();
        
        // Send success response to the client
        res.status(201).send(`Sum of ${a} and ${b} is ${results} saved in the database`);
    } catch (err) {
        // Handle error if there is any while connecting to or querying the database
        console.error('Error while connecting to the database:', err);
        res.status(500).send('Internal Server Error');
    }
}
//======================================================

// Function to handle GET request and retrieve data from the database
async function dataGet(id, req, res) {
    try {
        // Query to select data from the database table based on id
        const query = `SELECT * FROM ${TABLE} WHERE id = $1`;
        
        // Execute the query using pool.query()
        const { rows } = await pool.query(query, [id]);
        console.log(rows);
        
        // If no data found for the given id, send error response
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
        }
    
        // Send the retrieved data as JSON response
        res.json(rows[0]);
      } catch (error) {
        // Handle error if there is any while executing the query
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
//======================================================

// Export the dataGet and dataPost functions
module.exports =  {dataGet, dataPost};
