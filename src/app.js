import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { join } from 'path';

import { connectDB } from './db/index.js';
import { globalErrorHandle } from './errors/global-error-handle.js';
import router from './routers/index.route.js';

export async function application(app) {

    app.use(helmet());

    app.use(express.json());

    app.use(cookieParser());

    // app.use('/api/uploads', express.static(join(process.cwd(), '../uploads')));

    await connectDB();

    app.use('/api', router);

    app.use(globalErrorHandle);
}
