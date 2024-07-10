import eventModel from '../models/event.model.js';

const planServices = {
    create: async (event) => {
        const newEvent = await eventModel.create(event);
        return newEvent;
    },
};

export default planServices;
