import express from 'express';
import engagementController from '../controllers/engagement.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import entranceInterviewController from '../controllers/entranceInterview.controller.js';
const router = express.Router();

router
    .route('/create-interview/:id')
    .patch(entranceInterviewController.createInterview);

export default router;
