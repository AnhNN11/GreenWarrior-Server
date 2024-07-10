import express from 'express';
import LocationController from '../controllers/location.controller.js';
const router = express.Router();

router
    .route('/')
    .get(LocationController.getAll)
    .post(LocationController.create)
    .put(LocationController.update);
router
    .route('/:id')
    .get(LocationController.get)
    .delete(LocationController.delete);
export default router;
