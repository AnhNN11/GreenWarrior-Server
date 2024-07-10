import express from 'express';

import PointController from '../controllers/point.controller.js';

const pointRoutes = express.Router();

pointRoutes.route('/info').get(PointController.getAllUsers);

export default pointRoutes;
