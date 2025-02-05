const mysql = require("mysql");

// Create a database connection pool (Better performance)
const pool = mysql.createPool({
  connectionLimit: 10, // Set limit for simultaneous connections
  host: "localhost",
  user: "root",
  password: "falling", 
  database: "bookstore_db",
  multipleStatements: true, // Allow multiple SQL queries
});

// Log connection success/failure
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL as ID " + connection.threadId);
  connection.release(); // Release connection back to the pool
});

module.exports = { pool };
