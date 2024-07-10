import userModel from '../models/user.model.js';

const pointServices = {
    getAllUsers: async (page = 1, limit = 10) => {
        try {
            console.log('page', page);
            // Calculate the number of documents to skip
            const skip = (page - 1) * limit;

            // Find users and apply pagination
            const users = await userModel
                .find({})
                .skip(skip)
                .limit(limit)
                .select('username firstname lastname point avatarUrl points '); // Adjust fields as necessary

            // Optionally, get the total count of documents for pagination metadata
            const total = await userModel.countDocuments();

            // Return the users and any other pagination details you might need
            return {
                data: users,
                total,
                page,
                lastPage: Math.ceil(total / limit),
            };
        } catch (error) {
            // Handle or throw the error as appropriate
            throw error;
        }
    },
};

export default pointServices;
