import pointServices from '../services/activityPoint.service.js';

const PointController = {
    getAllUsers: async (req, res) => {
        try {
            console.log(req.query);
            // Extract page and limit query parameters from the request
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            // Call the service function
            const result = await pointServices.getAllUsers(page, limit);

            // Send the result back to the client
            res.json(result);
        } catch (error) {
            // Handle errors and send an appropriate response
            res.status(500).json({ message: error.message });
        }
    },
};

export default PointController;
