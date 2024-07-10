import express from 'express';
import clubController from '../controllers/club.controller.js';
const router = express.Router();

router.route('/').get(clubController.getAllClubs).post(clubController.addClub);
router.route('/pagination').get(clubController.getWithPagination);
router
    .route('/club-event-detail')
    .get(clubController.getClubDetailAndEventBySubname);
router
    .route('/:id')
    .get(clubController.getClub)
    .patch(clubController.updateClub);

export default router;
