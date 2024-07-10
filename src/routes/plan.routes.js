import express from 'express';

import planController from '../controllers/plan.controller.js';

const planRoutes = express.Router();

planRoutes.route('/').post(planController.create);

export default planRoutes;
