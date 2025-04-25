import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pool from './config/mysqldb.js';
import userRouter from './routes/userRoutes.js';
import protectedRouter from './routes/protectedRoutes.js'; 

// Set up environment variables
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Verify database connection on startup
pool.getConnection()
  .then(conn => {
    console.log('Database connection verified');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Make sure you have this before routes:
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Mount user routes
app.use('/api/user', userRouter);
app.use('/api', protectedRouter); 

// Root route
app.get('/', (req, res) => {
  res.send('API is running... :)');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
