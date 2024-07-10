import clubService from '../services/club.service.js';
import departmentService from '../services/department.service.js';

const departmentController = {
    create: async (req, res, next) => {
        // #swagger.tags = ['ClubCategories']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'name',
            description: 'Add new club category.',
            schema: { $ref: '#/definitions/Adddepartment' }
        } */
        try {
            const department = await departmentService.create(req.body);
            // #swagger.responses[200]
            res.status(200).json({
                result: department,
            });
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const clubCategories = await departmentService.getAll();
            // #swagger.responses[200]
            res.status(200).json({
                result: clubCategories,
            });
        } catch (error) {
            next(error);
        }
    },

    getAllByClubId: async (req, res, next) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const { subname } = req.query;
            const club = await clubService.getBySubname(subname);
            const departments = await departmentService.getAllByClubId(
                club._id
            );
            // #swagger.responses[200]
            res.status(200).json({
                result: departments,
            });
        } catch (error) {
            next(error);
        }
    },

    get: async (req, res, next) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const id = req.params.id;
            const department = await departmentService.get(id);
            // #swagger.responses[200]
            res.status(200).json({
                result: department,
            });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res) => {
        // #swagger.tags = ['ClubCategories']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'body',
            description: 'Update club category.',
            schema: { $ref: '#/definitions/Updatedepartment' }
        } */
        try {
            const department = await departmentService.update(req.body);
            // #swagger.responses[200]
            res.status(200).json({
                result: department,
            });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const id = req.params.id;
            const department = await departmentService.delete(id);
            // #swagger.responses[200]
            res.status(200).json({
                result: department,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default departmentController;
