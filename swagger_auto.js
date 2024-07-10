import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();
const doc = {
    swagger: '2.0',
    info: {
        title: 'NEXTTEAM COMMUNITY',
        version: '1.0.0',
        description:
            'This is the document for API of NEXTTEAM COMMUNITY made with Express and documented by Swagger.',
        contact: {
            name: 'QuangTVD',
            email: 'tranvietdangquang@gmail.com',
        },
    },
    host: `${process.env.HOST}:${process.env.PORT}`,

    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        api_key: {
            type: 'apiKey',
            name: 'api_key',
            in: 'header',
        },
    },
    servers: [
        {
            url: `http://${process.env.HOST}:${process.env.PORT}`,
        },
    ],
    definitions: {
        AddRole: {
            $name: 'Admin',
        },
        UpdateRole: {
            $id: '6652ccbea32811e1afc3159f',
            $name: 'something...',
        },
        AddClubCategory: {
            $name: '',
        },
        UpdateClubCategory: {
            $_id: '',
            $name: '',
        },
        AddClub: {
            $name: '',
            $subname: '',
            $category: '',
            $description: '',
            $avatarUrl: '',
            $bannerUrl: '',
            $activityPoint: '',
            $balance: '',
            $isActive: '',
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('./src/index.js');
});
