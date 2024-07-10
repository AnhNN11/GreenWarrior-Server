import LocationService from '../services/location.service.js';

const LocationController = {
    async getAll(req, res) {
        try {
            const locations = await LocationService.getAll();
            res.status(200).json({
                result: locations,
            });
        } catch (error) {
            next(error);
        }
    },
    async get(req, res) {
        try {
            const id = req.params.id;
            const location = await LocationService.get(id);
            res.status(200).json({
                result: location,
            });
        } catch (error) {
            next(error);
        }
    },
    async create(req, res) {
        try {
            const location = req.body;
            const newLocation = await LocationService.create(location);
            res.status(201).json({
                result: newLocation,
            });
        } catch (error) {
            next(error);
        }
    },
    async update(req, res) {
        try {
            const location = req.body;
            const updatedLocation = await LocationService.update(location);
            res.status(200).json({
                result: updatedLocation,
            });
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletedLocation = await LocationService.delete(id);
            res.status(200).json({
                result: deletedLocation,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default LocationController;
