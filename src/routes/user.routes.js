import express from 'express';
import userController from '../controllers/user.controller.js';
const router = express.Router();

router
    .route('/users')
        .get(userController.getPagination)
        .put(userController.update);
router
    .route('/users/:id')
        .get(userController.get);

export default router;
