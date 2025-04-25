import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/mysqldb.js';

const registerUser = async (req, res) => {
  let connection;
  try {
    const { username, password, clearance } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Check if username exists
    const [existingUsers] = await connection.query(
      'SELECT * FROM UserAccounts WHERE username = ?', 
      [username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const [result] = await connection.query(
      'INSERT INTO UserAccounts (username, password, clearance) VALUES (?, ?, ?)',
      [username, hashedPassword, clearance || null]
    );

    // Generate JWT
    const token = jwt.sign({ userID: result.insertId }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });

    res.status(201).json({ 
      success: true, 
      token, 
      user: { username } 
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  } finally {
    if (connection) connection.release(); // Always release the connection
  }
};

const loginUser = async (req, res) => {
  let connection;
  try {
    const { username, password, captcha } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    if (!captcha) {
      return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }

    // Verify CAPTCHA with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
    const captchaResponse = await fetch(verifyUrl, { method: 'POST' });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Find user
    const [users] = await connection.query(
      'SELECT * FROM UserAccounts WHERE username = ?', 
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ 
      userID: user.userID,
      clearance: user.clearance // Include clearance in token
    }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });

    res.status(200).json({ 
      success: true, 
      token, 
      user: { 
        username: user.username,
        clearance: user.clearance
      } 
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
};

export { registerUser, loginUser };