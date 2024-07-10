import express from 'express';
import departmentController from '../controllers/department.controller.js';
const departmentRouter = express.Router();

departmentRouter
    .route('/')
    .get(departmentController.getAll)
    .post(departmentController.create)
    .put(departmentController.update);
departmentRouter
    .route('/club-department')
    .get(departmentController.getAllByClubId);
departmentRouter
    .route('/:id')
    .get(departmentController.get)
    .delete(departmentController.delete);

export default departmentRouter;
