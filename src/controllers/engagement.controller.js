import clubService from '../services/club.service.js';
import engagementService from '../services/engagement.service.js';

const engagementController = {
    getWithPagination: async (req, res, next) => {
        // #swagger.tags = ['Engagements']
        try {
            const {
                subname,
                page = 1,
                limit = 10,
                filters,
                search,
            } = req.query;
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

            const club = await clubService.getBySubname(subname);

            const engagements = await engagementService.getWithPagination(
                club._id,
                parsedFilters,
                search,
                pageNum,
                pageSizeNum
            );

            console.log(club._id);

            // #swagger.responses[200]
            res.status(200).json({
                result: engagements,
            });
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        // #swagger.tags = ['Engagements']
        try {
            const engagements = await engagementService.getAll();
            // #swagger.responses[200]
            res.status(200).json({
                result: engagements,
            });
        } catch (error) {
            next(error);
        }
    },

    get: async (req, res, next) => {
        // #swagger.tags = ['Engagements']
        try {
            const { id } = req.params;
            const engagement = await engagementService.get(id);
            if (!engagement) {
                // #swagger.responses[404]
                res.status(404).json({ error: 'Not found' });
                return;
            }
            // #swagger.responses[200]
            res.status(200).json({
                result: engagement,
            });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        // #swagger.tags = ['Engagements']
        try {
            const engagement = req.body;
            const newEngagement = await engagementService.createEnagement(
                engagement
            );
            // #swagger.responses[201]
            res.status(201).json({
                result: newEngagement,
            });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        // #swagger.tags = ['Engagements']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'body',
            description: 'Update Engagements.',
            schema: { $ref: '#/definitions/UpdateEngagement' }
        } */
        try {
            console.log(req.body);
            const id = req.params.id;
            const updatetedEngagement = await engagementService.update(
                id,
                req.body
            );
            // #swagger.responses[200]
            if (updatetedEngagement) {
                res.status(200).json({
                    result: updatetedEngagement,
                });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        // #swagger.tags = ['Engagements']
        try {
            const id = req.params.id;
            const deletedEngagement = await engagementService.delete(id);
            // #swagger.responses[200]
            if (deletedEngagement) {
                res.status(200).json({
                    result: deletedEngagement,
                });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        } catch (error) {
            next(error);
        }
    },
};

export default engagementController;
