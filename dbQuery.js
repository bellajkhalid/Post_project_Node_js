const { pool, TABLE } = require('./db');

async function DatabaseOperations(a, b, results, res) {
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

module.exports = DatabaseOperations;
