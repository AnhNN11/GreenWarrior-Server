import express from 'express';
import VerifyController from '../controllers/verify.controller.js';

const router = express.Router();

router.route('/:subname').all();

router.route('/isAdmin').all(VerifyController.verifyAdmin);

export default router;
