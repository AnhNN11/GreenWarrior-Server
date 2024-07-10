import mongoose from 'mongoose';

const { Schema } = mongoose;
const { String } = Schema.Types;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
});

export default mongoose.model('majors', schema);
