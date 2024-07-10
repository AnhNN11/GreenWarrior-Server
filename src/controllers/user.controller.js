import UserService from '../services/user.service.js';

const UserController = {
    getPagination: async (req, res) => {
        // #swagger.tags = ['Users']
        try {
            const query = req.query;
            const users = await UserService.getPagination(query);
            // #swagger.responses[200]
            res.status(200).json({
                result: users,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
    get: async (req, res) => {
        // #swagger.tags = ['Users']
        try {
            const query = req.params;
            const user = await UserService.get(query.id);
            // #swagger.responses[200]
            res.status(200).json({
                result: user,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
    update: async (req, res) => {
        // #swagger.tags = ['Users']
        try {
            const body = req.body;
            const user = await UserService.update(body);
            // #swagger.responses[200]
            res.status(200).json({
                result: user,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400);
        }
    },
};

export default UserController;
