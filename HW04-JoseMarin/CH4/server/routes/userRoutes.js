import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

// Importing the user controller functions
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Route for user Registration
// http://localhost:4000/api/user/register
// Route for user Login
// http://localhost:4000/api/user/login

export default userRouter;