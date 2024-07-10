import planServices from '../services/plan.service.js';

const planController = {
    create: async (req, res, next) => {
        // #swagger.tags = ['Events']
        try {
            const event = req.body;
            const newEvent = await planServices.create(event);
            // #swagger.responses[201]
            res.status(201).json({
                result: newEvent,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default planController;
