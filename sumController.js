const pool = require('./db');

function computeAndInsertSum(a, b, callback) {
  const result = parseInt(a) + parseInt(b);
  pool.query(
    'INSERT INTO sum_table (a, b, result) VALUES ($1, $2, $3)',
    [a, b, result],
    (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, result);
      }
    }
  );
}

module.exports = { computeAndInsertSum };