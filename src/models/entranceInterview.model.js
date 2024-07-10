import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;
const { String, Date, ObjectId, Boolean } = Schema.Types;

const schema = new Schema(
    {
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
        note: {
            type: String,
        },
        location: {
            type: ObjectId,
            ref: 'locations',
        },
        comment: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: [
                'NEW',
                'SENT_INTERVIEW',
                'INTERVIEWED',
                'APPROVED',
                'REJECTED',
                'CANCELED',
            ],
            default: 'NEW',
        },
        updatedBy: {
            type: ObjectId,
            ref: 'users',
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

export default mongoose.model('entranceInterviews', schema);
