import clubModel from '../models/club.model.js';
import departmentModel from '../models/department.model.js';
import engagementModel from '../models/engagement.model.js';
import entranceInterviewModel from '../models/entranceInterview.model.js';
import locationModel from '../models/location.model.js';
import roleModel from '../models/role.model.js';
import userModel from '../models/user.model.js';

const entranceInterviewService = {
    create: async (req) => {
        const entranceInterviewRequest = new entranceInterviewModel(req);
        const entranceInterview = await entranceInterviewModel.create(
            entranceInterviewRequest
        );
        return entranceInterview;
    },

    getAll: async () => {
        const entranceInterviews = await entranceInterviewModel.find({});
        return entranceInterviews;
    },

    get: async (id) => {
        const entranceInterview = await entranceInterviewModel
            .findById(id)
            .populate({
                path: 'location',
                model: locationModel,
            })
            .populate({
                path: 'updatedBy',
                model: userModel,
            });
        return entranceInterview;
    },

    update: async (id, req) => {
        const entranceInterview =
            await entranceInterviewModel.findByIdAndUpdate(id, req, {
                new: true,
            });
        return entranceInterview;
    },

    delete: async (id) => {
        const entranceInterview = await entranceInterviewModel.deleteById(id);
        return entranceInterview;
    },
};

export default entranceInterviewService;
