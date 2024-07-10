import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;
const { String, ObjectId, Number } = Schema.Types;

const schema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: 'users',
        },
        department: {
            type: ObjectId,
            ref: 'departments',
        },
        club: {
            type: ObjectId,
            ref: 'clubs',
        },
        role: {
            type: ObjectId,
            ref: 'roles',
        },
        cvUrl: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['NEW', 'REJECTED', 'MEMBER', 'DROP_OUT'],
            default: 'NEW',
        },
        entranceInterview: {
            type: ObjectId,
            ref: 'entranceInterviews',
        },
        step: {
            type: Number,
            required: true,
            default: 0,
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
schema.plugin(mongooseDelete, { deletedBy: true, deletedByType: String });

export default mongoose.model('engagements', schema);
