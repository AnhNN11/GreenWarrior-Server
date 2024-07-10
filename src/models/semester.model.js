import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the semester schema
const semesterSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Fall', 'Spring', 'Summer'],
    },
    year: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isCurrent: {
        type: Boolean,
        default: false,
    },
});

// Define the middleware to update isCurrent flag
semesterSchema.pre('save', async function (next) {
    await Semester.updateMany({}, { $set: { isCurrent: false } });
    this.isCurrent = true;
    next();
});

// Create and export the Semester model
const Semester = mongoose.model('semesters', semesterSchema);
export default Semester;
