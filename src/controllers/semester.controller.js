import eventServices from '../services/event.service.js';
import semesterServices from '../services/semester.service.js';

const semesterController = {
    getAll: async (req, res) => {
        try {
            const locations = await semesterServices.getAll();
            res.status(200).json({
                result: locations,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        console.log('-================================================');
        console.log(req.body);
        console.log('-================================================');

        // #swagger.tags = ['Events']
        try {
            const semester = req.body;
            const newsemester = await semesterServices.create(semester);
            // #swagger.responses[201]
            res.status(201).json({
                result: newsemester,
            });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedSemester = await semesterServices.updateSemesterById(
                id,
                updateData
            );
            if (!updatedSemester) {
                return res.status(404).send({ message: 'Semester not found' });
            }
            return res.status(200).json(updatedSemester);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
    delete: async (req, res, next) => {
        // #swagger.tags = ['Events']
        try {
            const { id } = req.params;
            const deletedEvent = await semesterServices.delete(id);
            if (!deletedEvent) {
                // #swagger.responses[404]
                res.status(404).json({ error: 'Event not found' });
                return;
            }
            // #swagger.responses[200]
            res.status(200).json({
                result: deletedEvent,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default semesterController;
