import RoleModel from '../models/role.model.js';

const VerifyService = {
    check: async (req) => {
        const { name } = req;
        const role = await RoleModel.create({ name });
        return role;
    },
};

export default VerifyService;
