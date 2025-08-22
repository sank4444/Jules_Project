const sqlite3 = require('sqlite3').verbose();

// Connect to a database file. If it does not exist, it will be created.
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the SQLite database.');
});

// Create the employees table if it doesn't exist
const createTableSql = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL
  )
`;

db.run(createTableSql, (err) => {
  if (err) {
    // Table already created
    return console.error(err.message);
  }
  console.log("Employees table created or already exists.");
});

module.exports = db;
