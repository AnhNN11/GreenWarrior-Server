import UserModel from '../models/user.model.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const UserService = {
    getPagination: async (query) => {
        const users = await UserModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            firstname: {
                                $regex: query.search ?? undefined,
                                $options: 'u',
                            },
                        },
                        {
                            lastname: {
                                $regex: query.search ?? undefined,
                                $options: 'u',
                            },
                        },
                    ],
                },
            },
            {
                $addFields: {
                    name: {
                        $concat: ['$firstname', ' ', '$lastname'],
                    },
                    password: '',
                },
            },
            {
                $skip:
                    (Number.parseInt(query.page) - 1) *
                    Number.parseInt(query.page_size),
            },
            {
                $limit: Number.parseInt(query.page_size),
            },
        ]);
        return users;
    },
    get: async (id) => {
        let user = await UserModel.findById(id);
        user.password = '';
        console.log(user.name);
        return user;
    },
    update: async (body) => {
        const id = body._id;
        delete body._id;
        let user = await UserModel.findByIdAndUpdate(id, body);
        user.password = '';
        console.log(user.name);
        return user;
    },
    
};

export default UserService;
