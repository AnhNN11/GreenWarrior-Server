import express from 'express';

import eventController from '../controllers/event.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const eventRoutes = express.Router();

eventRoutes
    .route('/')
    .get(
        authMiddleware.protect,
        authMiddleware.checkIsAdmin,
        eventController.getAll
    );
eventRoutes
    .route('/:id')
    .get(
        authMiddleware.protect,
        authMiddleware.checkIsAdmin,
        eventController.getOne
    );
eventRoutes.route('/').post(authMiddleware.protect, eventController.create);
eventRoutes.route('/:id').patch(authMiddleware.protect, eventController.update);
eventRoutes
    .route('/:id')
    .delete(authMiddleware.protect, eventController.delete);

export default eventRoutes;
