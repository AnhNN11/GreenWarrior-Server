import express from 'express';
import engagementController from '../controllers/engagement.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router
    .route('/')
    .get(authMiddleware.protect, engagementController.getAll)
    .post(authMiddleware.protect, engagementController.create);
router
    .route('/pagination')
    .get(authMiddleware.protect, engagementController.getWithPagination);

router
    .route('/:id')
    .patch(authMiddleware.protect, engagementController.update)
    .get(authMiddleware.protect, engagementController.get)
    .delete(authMiddleware.protect, engagementController.delete);

export default router;
