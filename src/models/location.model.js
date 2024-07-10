import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String } = Schema.Types;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    building: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

export default mongoose.model('locations', schema);
