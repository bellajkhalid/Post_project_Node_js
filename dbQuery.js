const { pool, TABLE } = require('./db');
async function DatabaseOperations(a, b, results,res) {
    let client;
    try {
      // Step 4: Acquire a client from the connection pool
      client = await pool.connect();
      pool.query(`INSERT INTO ${TABLE} (a, b, ab) VALUES ($1, $2, $3)`, [a, b, results], (error, results) => {
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
  module.exports = DatabaseOperations;