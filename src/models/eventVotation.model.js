import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId, Boolean } = Schema.Types;

const schema = new Schema(
    {
        event: {
            type: ObjectId,
            ref: 'events',
        },
        user: {
            type: ObjectId,
            ref: 'users',
        },
        isAgreed: {
            type: Boolean,
            required: true,
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

export default mongoose.model('eventVotations', schema);
