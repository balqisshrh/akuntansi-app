require('dotenv').config();
const mysql = require('mysql2');

console.log('ENV:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL Database!');
});

module.exports = db;

