const { pool, TABLE } = require('./db');

//======================================================

async function dataPost(a, b, results, res) {
    try {
        const client = await pool.connect();
        await pool.query(`INSERT INTO ${TABLE} (a, b, ab) VALUES ($1, $2, $3)`, [a, b, results]);
        client.release();
        
        res.status(201).send(`Sum of ${a} and ${b} is ${results} saved in the database`);
    } catch (err) {
        console.error('Error while connecting to the database:', err);
        res.status(500).send('Internal Server Error');
    }
}
//======================================================

async function dataGet(id,req, res) {
    
    try {
        // Query to select data from your database table based on id
        const query =`SELECT * FROM ${TABLE} WHERE id = $1` ;
        // Execute the query using pool.query()
        const { rows } = await pool.query(query, [id]);
        console.log(rows);
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
        }
    
        res.json(rows[0]); // Send the retrieved data as JSON response
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
//======================================================

module.exports =  {dataGet, dataPost};
