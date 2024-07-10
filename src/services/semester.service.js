import clubModel from '../models/club.model.js';

import locationModel from '../models/location.model.js';
import semesterModel from '../models/semester.model.js';
import dayjs from 'dayjs';

const semesterServices = {
    getAll: async () => {
        const semesterList = await semesterModel.find({});
        return semesterList;
    },
    create: async (semester) => {
        const newSemester = await semesterModel.create(semester);
        return newSemester;
    },
    updateSemesterById: async (id, updateData) => {
        try {
            const updatedSemester = await semesterModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
            return updatedSemester;
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        const deletedEvent = await semesterModel.findByIdAndDelete(id);
        return deletedEvent;
    },
};

export default semesterServices;
