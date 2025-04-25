// import jwt from 'jsonwebtoken';

// const userAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       console.log('No token provided in Authorization header');
//       return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });
//     }

//     console.log('Token received:', token);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded token:', decoded);

//     if (decoded.userID) {
//       req.user = { userID: decoded.userID }; // Attach to req.user instead of req.body
//       next();

//     } else {
//       console.log('Token does not contain userID');
//       return res.status(401).json({ success: false, message: 'Invalid token.' });
//     }
//   } catch (error) {
//     console.error('Auth middleware error:', error.message);
//     return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
//   }
// };

// export default userAuth;

import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userID) {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }

    // Attach user info including clearance
    req.user = { 
      userID: decoded.userID,
      clearance: decoded.clearance 
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export default userAuth;