import clubModel from '../models/club.model.js';
import eventModel from '../models/event.model.js';
import locationModel from '../models/location.model.js';

const eventServices = {
    getAll: async (filters = {}, search = '', page = 1, limit = 10) => {
        for (const key in filters) {
            if (filters[key] === '') {
                delete filters[key];
            }
        }

        // Calculate the skip value for pagination
        const skip = (page - 1) * limit;

        if (search?.length) {
            const searchRegex = new RegExp(search, 'i');
            filters.$or = [{ name: searchRegex }];
        }

        // Apply filters and pagination to the query
        const events = await eventModel
            .find(filters)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({
                path: 'club',
                model: clubModel,
            })
            .populate({
                path: 'location',
                model: locationModel,
            });

        // Get the total count of documents that match the filters
        const totalCount = await eventModel.countDocuments(filters);

        return {
            length: events.length,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            events,
        };
    },
    getOne: async (id) => {
        const event = await eventModel
            .findById(id)
            .populate({
                path: 'club',
                model: clubModel,
            })
            .populate({
                path: 'location',
                model: locationModel,
            });

        return event;
    },
    create: async (event) => {
        const newEvent = await eventModel.create(event);
        return newEvent;
    },
    update: async (id, event) => {
        const updatedEvent = await eventModel.findByIdAndUpdate(id, event, {
            new: true,
        });
        return updatedEvent;
    },
    delete: async (id) => {
        const deletedEvent = await eventModel.findByIdAndDelete(id);
        return deletedEvent;
    },

    getByClubId: async (
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
            filters.$or = [{ name: searchRegex }, { club: clubId }];
        }

        // Apply filters and pagination to the query
        const events = await eventModel
            .find(filters)
            .sort({ startTime: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'location',
                model: locationModel,
            });

        // Get the total count of documents that match the filters
        const totalCount = await eventModel.countDocuments(filters);

        return {
            length: events.length,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            events,
        };
    },
};

export default eventServices;
