import express from 'express';
import { signIn, signUp, logOut } from '../controllers/auth.controller.js';

const router = express.Router();      // initializing a router instance (a mini express app)

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/logOut', logOut);

export default router;

// NetflixOwner
// 57ABrofXyHd7nrti