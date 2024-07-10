import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, ObjectId, Date } = Schema.Types;

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        registeredBy: {
            type: ObjectId,
            ref: 'users',
            required: true,
        },
        location: {
            type: ObjectId,
            ref: 'locations',
            required: true,
        },
        checkInCode: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['PUBLIC', 'INTERNAL'],
        },
        planUrl: {
            type: String,
            required: true,
        },
        bannerUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['PENDING', 'APPROVED', 'REJECTED'],
            default: 'PENDING',
        },
        response: {
            type: String,
        },
        club: {
            type: ObjectId,
            ref: 'clubs',
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

export default mongoose.model('events', schema);
