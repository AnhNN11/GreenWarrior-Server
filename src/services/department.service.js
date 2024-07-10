import departmentModel from '../models/department.model.js';

const departmentService = {
    create: async (req) => {
        const request = new departmentModel(req);
        const department = await departmentModel.create(request);
        return department;
    },
    getAll: async () => {
        const department = await departmentModel.find({});
        return department;
    },
    getAllByClubId: async (clubId) => {
        const department = await departmentModel.find({ club: clubId });
        return department;
    },
    get: async (id) => {
        const department = await departmentModel.findById(id);
        return department;
    },
    update: async (req) => {
        const request = new departmentModel(req);
        const department = await departmentModel.findByIdAndUpdate(
            request._id,
            {
                $set: request,
            },
            { new: true }
        );
        return department;
    },
    delete: async (id) => {
        const department = await departmentModel.findByIdAndDelete(id);
        return department;
    },
};

export default departmentService;
