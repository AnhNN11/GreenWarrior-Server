import locationModel from '../models/location.model.js';

const LocationService = {
    getAll: async () => {
        const locations = await locationModel.find({});
        return locations;
    },
    get: async (id) => {
        const location = await locationModel.findById(id);
        return location;
    },
    create: async (req) => {
        const request = new locationModel(req);
        const location = await locationModel.create(request);
        return location;
    },
    update: async (req) => {
        const request = new locationModel(req);
        const location = await locationModel.findByIdAndUpdate(
            request._id,
            {
                $set: request,
            },
            { new: true }
        );
        return location;
    },
    delete: async (id) => {
        const location = await locationModel.findByIdAndDelete(id);
        return location;
    },
};

export default LocationService;
