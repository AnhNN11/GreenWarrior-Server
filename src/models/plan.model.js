import { response } from 'express';
import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String, ObjectId, Number, Boolean, Date } = Schema.Types;

const planSchema = new Schema(
    {
        clubId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'clubs',
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        attachement: {
            type: String,
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
        isApproved: {
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

export default mongoose.model('plans', planSchema);
