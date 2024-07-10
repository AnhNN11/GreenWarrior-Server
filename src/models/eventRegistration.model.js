import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, ObjectId, Boolean } = Schema.Types;

const schema = new Schema(
    {
        event: {
            type: ObjectId,
            ref: 'events',
        },
        registeredBy: {
            type: ObjectId,
            ref: 'users',
        },
        isJoined: {
            type: Boolean,
            required: true,
        },
        reasonForAbsence: {
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

export default mongoose.model('eventRegistrations', schema);
