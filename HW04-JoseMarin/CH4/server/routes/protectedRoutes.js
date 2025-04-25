import express from 'express';
import userAuth from '../middlewares/auth.js';
import pool from '../config/mysqldb.js';

const protectedRouter = express.Router();

// Middleware to protect routes
// In protectedRoutes.js
protectedRouter.get('/user', userAuth, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT username, clearance FROM UserAccounts WHERE userID = ?', 
      [req.user.userID]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ 
      success: true, 
      user: users[0]
    });
  } catch (error) {
    console.error('User route error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default protectedRouter;