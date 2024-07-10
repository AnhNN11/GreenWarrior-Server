import clubModel from '../models/club.model.js';
import departmentModel from '../models/department.model.js';
import engagementModel from '../models/engagement.model.js';
import entranceInterviewModel from '../models/entranceInterview.model.js';
import roleModel from '../models/role.model.js';
import userModel from '../models/user.model.js';
import clubService from './club.service.js';

const engagementService = {
    createEnagement: async (req) => {
        const engagementRequest = new engagementModel(req);
        const engegement = await engagementModel.create(engagementRequest);
        return engegement;
    },

    getAll: async () => {
        const engegements = await engagementModel.find({});
        return engegements;
    },

    get: async (id) => {
        const engegement = await engagementModel
            .findById(id)
            .populate({
                path: 'user',
                model: userModel,
            })
            .populate({
                path: 'department',
                model: departmentModel,
            })
            .populate({
                path: 'entranceInterview',
                model: entranceInterviewModel,
            })
            .populate({
                path: 'role',
                model: roleModel,
            });
        return engegement;
    },

    getAllByClubId: async (clubId) => {
        const engegements = await engagementModel.find({ club: clubId });
        return engegements;
    },

    getWithPagination: async (
        clubId,
        filters = {},
        search = '',
        page = 1,
        limit = 10
    ) => {
        for (const key in filters) {
            if (filters[key] === '') {
                delete filters[key];
            }
        }
        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        if (search?.length) {
            const searchRegex = new RegExp(search, 'i');
            filters.$or = [
                { 'user.firstname': searchRegex },
                { 'user.lastname': searchRegex },
                { club: clubId },
            ];
        }

        // Apply filters and pagination to the query
        const engagements = await engagementModel
            .find(filters)
            .sort({ startTime: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'user',
                model: userModel,
            })
            .populate({
                path: 'department',
                model: departmentModel,
            })
            .populate({
                path: 'entranceInterview',
                model: entranceInterviewModel,
            });

        // Get the total count of documents that match the filters
        const totalCount = await engagementModel.countDocuments(filters);

        return {
            length: engagements.length,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            engagements,
        };
    },

    update: async (id, req) => {
        const engegement = await engagementModel.findByIdAndUpdate(id, req, {
            new: true,
        });
        return engegement;
    },

    delete: async (id) => {
        const engegement = await engagementModel.deleteById(id);
        return engegement;
    },
};

export default engagementService;
