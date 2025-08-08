import consola from 'consola';
import express from 'express';
import { application } from './app.js';
import config from './config/index.js';

const app = express();
const PORT = config.PORT || 2000;

await application(app);

app.listen(PORT, () => consola.info(`Server running http://localhost:${PORT}`));
