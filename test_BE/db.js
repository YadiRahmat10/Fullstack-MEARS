const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_test'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the databasee:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;

