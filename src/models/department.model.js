import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;
const { String, ObjectId } = Schema.Types;

const schema = new Schema(
    {
        club: {
            type: ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
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
schema.plugin(mongooseDelete, { deletedBy: true, deletedByType: String });

export default mongoose.model('departments', schema);
