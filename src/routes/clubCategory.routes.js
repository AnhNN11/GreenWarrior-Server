import express from 'express'
import clubCategoryController from '../controllers/clubCategory.controller.js';
const router = express.Router();

router
    .route('/')
    .get(clubCategoryController.getAllCategories)
    .post(clubCategoryController.create)
    .put(clubCategoryController.update);
router
    .route('/:id')
    .get(clubCategoryController.get)
    .delete(clubCategoryController.delete);
export default router;
