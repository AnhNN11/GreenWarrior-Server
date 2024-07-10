import express from 'express';
import roleController from '../controllers/role.controller.js';
const router = express.Router();

router
    .route('/')
    .get(roleController.getAll)
    .post(roleController.create)
    .put(roleController.set);

router.route('/:id').get(roleController.get).delete(roleController.delete);

export default router;
