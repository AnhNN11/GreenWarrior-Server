import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import connectDatabase from './configs/db.config.js';
import initRoutes from './routes/index.js';
import bodyParser from 'body-parser';
import swagger from '../swagger.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3333;
const host = process.env.HOST || 'localhost';

/** Connect to database */
connectDatabase();

swagger(app);

/** Middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});

/** Api routes */
initRoutes(app);

/** Start server */
app.listen(port, () => {
    console.info(`🚀 Server running on: http://${host}:${port}/autogen-docs`);
});
