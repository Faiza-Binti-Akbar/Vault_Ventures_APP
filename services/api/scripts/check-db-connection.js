require('dotenv').config();

async function checkDatabaseConnection() {
  let pool;

  try {
    pool = require('../src/config/database');
    const [rows] = await pool.query('SELECT 1 AS ok');

    if (rows[0]?.ok !== 1) {
      throw new Error('Unexpected response from SELECT 1');
    }

    console.log('MySQL connectivity check passed: SELECT 1 returned 1.');
  } catch (error) {
    console.error(`MySQL connectivity check failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

checkDatabaseConnection();
