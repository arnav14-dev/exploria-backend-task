import express from 'express';
import { authUser } from '../middleware/authUser.js';
import { expensive, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', authUser, logout);       //only authorized users can logout
router.get('/expensive', authUser, expensive);

export default router;