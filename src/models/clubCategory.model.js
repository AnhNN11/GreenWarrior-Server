import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;
const { String } = Schema.Types;

const clubCategorySchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
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
clubCategorySchema.plugin(mongooseDelete, {
    deletedBy: true,
    deletedByType: String,
});

export default mongoose.model('clubCategories', clubCategorySchema);
