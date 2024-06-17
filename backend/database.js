const sqlite3 = require('sqlite3').verbose();

// Open a database in memory
const db = new sqlite3.Database('./userForms.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// Create a table for storing user signups
db.run(`CREATE TABLE IF NOT EXISTS signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    city TEXT,
    state TEXT
)`);

module.exports = db;
