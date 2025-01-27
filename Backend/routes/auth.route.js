import express from 'express';
import { signIn, signUp, logOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/logOut', logOut);

export default router;



// NetflixOwner

// 57ABrofXyHd7nrti