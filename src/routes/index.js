import errorHandler from '../middlewares/errorHandler.middleware.js';
import authRoutes from './auth.routes.js';
import eventRoutes from './event.routes.js';
import verifyRole from './verify.routes.js';
import roleRoutes from './role.routes.js';
import userRoutes from './user.routes.js';
import dotenv from 'dotenv';
import clubRoutes from './club.routes.js';
import clubCategoryRoutes from './clubCategory.routes.js';
import locationRoutes from './location.routes.js';
import engagementRouter from './engagement.route.js';
import departmentRouter from './department.routes.js';
import entranceInterviewRouter from './entraceInterview.routes.js';
import pointRoutes from './point.routes.js';
import semesterRouter from './semester.routes.js';

dotenv.config();
const prefix = process.env.API_VERSION;
console.log(prefix);
const initRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    app.use(`${prefix}/auth`, authRoutes);
    app.use('/api/club-category', clubCategoryRoutes);

    app.use(`${prefix}/clubs`, clubRoutes);
    app.use(`${prefix}/club-category`, clubCategoryRoutes);
    app.use(`${prefix}/point`, pointRoutes);
    app.use(`${prefix}/semester`, semesterRouter);

    app.use(`${prefix}/department`, departmentRouter);
    app.use(`${prefix}/role`, roleRoutes);
    app.use('/api', roleRoutes);
    app.use('/api/v1', userRoutes);
    app.use(`${prefix}/event`, eventRoutes);
    app.use(`${prefix}/location`, locationRoutes);
    app.use(`${prefix}/engagement`, engagementRouter);

    app.use('/api', errorHandler);
    app.use(`${prefix}/entrance-interview`, entranceInterviewRouter);
};

export default initRoutes;
