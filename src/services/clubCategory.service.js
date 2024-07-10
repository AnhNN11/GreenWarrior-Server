import clubCategoryModel from '../models/clubCategory.model.js';

const clubCategoryService = {
    create: async (req) => {
        const request = new clubCategoryModel(req);
        const clubCategory = await clubCategoryModel.create(request);
        return clubCategory;
    },
    getAll: async () => {
        const clubCategory = await clubCategoryModel.find({});
        return clubCategory;
    },
    get: async (id) => {
        const clubCategory = await clubCategoryModel.findById(id);
        return clubCategory;
    },
    update: async (req) => {
        const request = new clubCategoryModel(req);
        const clubCategory = await clubCategoryModel.findByIdAndUpdate(
            request._id,
            {
                $set: request,
            },
            { new: true }
        );
        return clubCategory;
    },
    delete: async (id) => {
        const clubCategory = await clubCategoryModel.findByIdAndDelete(id);
        return clubCategory;
    },
};

export default clubCategoryService;
