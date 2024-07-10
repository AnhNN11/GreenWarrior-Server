import RoleModel from '../models/role.model.js';

const RoleService = {
    createRole: async (req) => {
        const { name } = req;
        const role = await RoleModel.create({ name });
        return role;
    },
    getAll: async () => {
        const role = await RoleModel.find({});
        return role;
    },
    get: async (id) => {
        const role = await RoleModel.findById(id);
        return role;
    },
    update: async (req) => {
        const { id, name } = req;
        const role = await RoleModel.findByIdAndUpdate(id, { $set: { name } });
        return role;
    },
    delete: async (id) => {
        const role = await RoleModel.findByIdAndDelete(id);
        return role;
    },
};

export default RoleService;
