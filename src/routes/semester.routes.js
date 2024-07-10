import express from 'express';

import semesterController from '../controllers/semester.controller.js';
const semesterRouter = express.Router();

semesterRouter
    .route('/')
    .get(semesterController.getAll)
    .post(semesterController.create);

semesterRouter.route('/:id').patch(semesterController.update);
semesterRouter.route('/:id').delete(semesterController.delete);

export default semesterRouter;
