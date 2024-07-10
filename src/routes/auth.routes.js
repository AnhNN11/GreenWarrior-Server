import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/signUpGG', authController.signUp);

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/loginWithGoogle', authController.loginWithGoogle);
router.post('/resetPassword/:token', authController.resetPassword);

export default router;
