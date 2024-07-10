import eventServices from '../services/event.service.js';

const eventController = {
    getAll: async (req, res) => {
        // #swagger.tags = ['Events']
        try {
            const { page = 1, limit = 10, filters, search } = req.query;
            const pageNum = parseInt(page, 10);
            const pageSizeNum = parseInt(limit, 10);

            // Parsing filters safely
            let parsedFilters = {};
            if (filters) {
                try {
                    parsedFilters = JSON.parse(filters);
                } catch (error) {
                    return res
                        .status(400)
                        .json({ error: 'Invalid filters format' });
                }
            }

            const events = await eventServices.getAll(
                parsedFilters,
                search,
                pageNum,
                pageSizeNum
            );

            // #swagger.responses[200]
            res.status(200).json({
                result: events,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getOne: async (req, res, next) => {
        // #swagger.tags = ['Events']
        try {
            const { id } = req.params;
            const event = await eventServices.getOne(id);
            if (!event) {
                // #swagger.responses[404]
                res.status(404).json({ error: 'Event not found' });
                return;
            }
            // #swagger.responses[200]
            res.status(200).json({
                result: event,
            });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        // #swagger.tags = ['Events']
        try {
            const event = req.body;
            const newEvent = await eventServices.create(event);
            // #swagger.responses[201]
            res.status(201).json({
                result: newEvent,
            });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        // #swagger.tags = ['Events']
        try {
            const { id } = req.params;
            const event = req.body;
            const updatedEvent = await eventServices.update(id, event);
            if (!updatedEvent) {
                // #swagger.responses[404]
                res.status(404).json({ error: 'Event not found' });
                return;
            }
            // #swagger.responses[200]
            res.status(200).json({
                result: updatedEvent,
            });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        // #swagger.tags = ['Events']
        try {
            const { id } = req.params;
            const deletedEvent = await eventServices.delete(id);
            if (!deletedEvent) {
                // #swagger.responses[404]
                res.status(404).json({ error: 'Event not found' });
                return;
            }
            // #swagger.responses[200]
            res.status(200).json({
                result: deletedEvent,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default eventController;
