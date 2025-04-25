import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(conn => {
    console.log('Connected to MySQL database');
    conn.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Export the pool directly
export default pool;