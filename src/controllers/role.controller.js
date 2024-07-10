import RoleService from '../services/role.service.js';

const RoleController = {
    create: async (req, res) => {
        // #swagger.tags = ['Roles']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'name',
            description: 'Add new role.',
            schema: { $ref: '#/definitions/AddRole' }
        } */
        try {
            const newRole = await RoleService.createRole(req.body);
            // #swagger.responses[200]
            res.status(200).json({
                result: newRole,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
    getAll: async (req, res) => {
        // #swagger.tags = ['Roles']
        try {
            const role = await RoleService.getAll();
            // #swagger.responses[200]
            res.status(200).json({
                result: role,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
    get: async (req, res) => {
        // #swagger.tags = ['Roles']
        try {
            const id = req.params.id;
            const role = await RoleService.get(id);
            // #swagger.responses[200]
            res.status(200).json({
                result: role,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
    set: async (req, res) => {
        // #swagger.tags = ['Roles']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'body',
            description: 'Update role.',
            schema: { $ref: '#/definitions/UpdateRole' }
        } */
        try {
            const role = await RoleService.update(req.body);
            // #swagger.responses[200]
            res.status(200).json({
                old: role,
                result: await RoleService.get(req.body.id),
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Roles']
        try {
            const id = req.params.id;
            const role = await RoleService.delete(id);
            // #swagger.responses[200]
            res.status(200).json({
                result: role,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
};

export default RoleController;
