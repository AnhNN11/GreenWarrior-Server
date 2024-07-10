import moment from 'moment';
import clubService from '../services/club.service.js';
import engagementService from '../services/engagement.service.js';
import entranceInterviewService from '../services/entranceInterview.service.js';
import UserService from '../services/user.service.js';
import sendEmail from '../utils/email.js';

const entranceInterviewController = {
    getAll: async (req, res, next) => {
        // #swagger.tags = ['EntranceInterviews']
        try {
            const entranceInterviews = await entranceInterviewService.getAll();
            // #swagger.responses[200]
            res.status(200).json({
                result: entranceInterviews,
            });
        } catch (error) {
            next(error);
        }
    },

    get: async (req, res, next) => {
        // #swagger.tags = ['EntranceInterviews']
        try {
            const { id } = req.params;
            const entranceInterview = await entranceInterviewService.get(id);
            if (!engagement) {
                // #swagger.responses[404]
                res.status(404).json({ error: 'Not found' });
                return;
            }
            // #swagger.responses[200]
            res.status(200).json({
                result: entranceInterview,
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        // #swagger.tags = ['EntranceInterviews']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'body',
            description: 'Update EntranceInterviews.',
            schema: { $ref: '#/definitions/UpdateEntranceInterview' }
        } */
        try {
            console.log(req.body);
            const id = req.params.id;
            const updatedEntranceInterview =
                await entranceInterviewService.update(id, req.body);
            // #swagger.responses[200]
            if (updatedEntranceInterview) {
                res.status(200).json({
                    result: updatedEntranceInterview,
                });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        } catch (error) {
            next(error);
        }
    },

    createInterview: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedEntranceInterview =
                await entranceInterviewService.update(id, req.body);
            if (updatedEntranceInterview) {
                res.status(200).json({
                    result: updatedEntranceInterview,
                });
            } else {
                res.status(404).json({ message: 'Not found' });
            }

            const updatedEngagement = await engagementService.update(
                req.body.engagementId,
                {
                    step: '2',
                }
            );

            const user = await UserService.get(updatedEngagement.user);

            const message = `Dear ${user.firstname + ' ' + user.lastname},

            We are pleased to inform you that your interview has been scheduled. Please find the details below:
            
            Interview Date and Time: ${moment(
                updatedEntranceInterview.startTime
            ).format('DD/MM/YYYY HH:mm ')} - ${moment(
                updatedEntranceInterview.endTime
            ).format('HH:mm')}
            Location: ${updatedEntranceInterview.location}

            Notes: ${updatedEntranceInterview.note}
            
            Please ensure you arrive at least 10 minutes before the scheduled time. If you have any questions or need to reschedule, feel free to contact us.
            
            Best regards,
            NextTeam`;

            await sendEmail({
                email: user.email,
                subject: 'Notification of interview schedule',
                message,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default entranceInterviewController;
