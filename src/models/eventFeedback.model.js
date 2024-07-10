import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, ObjectId, Number } = Schema.Types;

const schema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: 'users',
        },
        event: {
            type: ObjectId,
            ref: 'events',
        },
        point: {
            type: Number,
            required: true,
        },
        content: {
            type: String,
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

export default mongoose.model('eventFeedbacks', schema);
