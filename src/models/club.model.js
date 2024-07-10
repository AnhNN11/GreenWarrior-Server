import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;
const { String, ObjectId, Number, Boolean, Date } = Schema.Types;

const clubSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Club name is required!'],
            unique: true,
            validate: {
                validator: function (val) {
                    return /^[A-Z]/.test(val);
                },
                message: 'Club name must start with an uppercase letter!',
            },
        },
        subname: {
            type: String,
            required: [true, 'Club subname is required!'],
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Club category is required!'],
            ref: 'clubCategories',
        },
        description: {
            type: String,
            required: [true, 'Club description is required!'],
        },
        avatarUrl: {
            type: String,
            required: [true, 'Club avatar is required!'],
        },
        bannerUrl: {
            type: String,
            required: [true, 'Club banner is required!'],
        },
        activityPoint: {
            type: Number,
            min: [0, 'Club activity point must be larger than 0'],
            default: 0,
        },
        balance: {
            type: Number,
            min: [0, 'Club balance must be larger than 0'],
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            select: true,
        },
        updatedAt: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);
clubSchema.plugin(mongooseDelete, { deletedBy: true, deletedByType: String });

export default mongoose.model('clubs', clubSchema);
