import { readFile } from 'fs/promises';
import swaggerUi from 'swagger-ui-express';

async function loadSwaggerFile() {
    const data = await readFile(
        new URL('./swagger-output.json', import.meta.url),
        'utf-8'
    );
    return JSON.parse(data);
}

export default async function (app) {
    const swaggerFile = await loadSwaggerFile();

    app.use('/autogen-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.get('/docs', (req, res) => {
        res.json(swaggerFile);
    });
}
