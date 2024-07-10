import ClubCategory from './../models/clubCategory.model.js';
import catchAsync from './../utils/catchAsync.js';
import APIFeatures from './../utils/APIFeatures.js';
import AppResponse from './../utils/AppResponse.js';
import clubCategoryService from '../services/clubCategory.service.js';

const clubCategoryController = {
    create: async (req, res) => {
        // #swagger.tags = ['ClubCategories']
        /* #swagger.parameters['body'] = {
            in: 'body',
            name: 'name',
            description: 'Add new club category.',
            schema: { $ref: '#/definitions/AddClubCategory' }
        } */
        try {
            const clubCategory = await clubCategoryService.create(req.body);
            // #swagger.responses[200]
            res.status(200).json({
                result: clubCategory,
            });
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const clubCategories = await clubCategoryService.getAll();
            // #swagger.responses[200]
            res.status(200).json({
                result: clubCategories,
            });
        } catch (error) {
            next(error);
        }
    },
    get: async (req, res) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const id = req.params.id;
            const clubCategory = await clubCategoryService.get(id);
            // #swagger.responses[200]
            res.status(200).json({
                result: clubCategory,
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
            schema: { $ref: '#/definitions/UpdateClubCategory' }
        } */
        try {
            const clubCategory = await clubCategoryService.update(req.body);
            // #swagger.responses[200]
            res.status(200).json({
                result: clubCategory,
            });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res) => {
        // #swagger.tags = ['ClubCategories']
        try {
            const id = req.params.id;
            const clubCategory = await clubCategoryService.delete(id);
            // #swagger.responses[200]
            res.status(200).json({
                result: clubCategory,
            });
        } catch (error) {
            next(error);
        }
    },
    getAllCategories: catchAsync(async (req, res, next) => {
        const features = new APIFeatures(ClubCategory.find(), req.query)
            .filter()
            .paginate()
            .sort()
            .limitFields();
        const categories = await features.query;
        AppResponse.success(
            res,
            categories.length,
            categories,
            'Fetch data success'
        );
    }),
};

export default clubCategoryController;
