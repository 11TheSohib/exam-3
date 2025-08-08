import { Router } from 'express';

import { notFoundError } from '../errors/not-found.error.js';
import adminRouter from './admin.route.js';
import clientRouter from './client.route.js';
import flowerIMGRouter from './flower-image.route.js';

const router = Router();

router
    .use(`/admin`, adminRouter)
    .use(`/client`, clientRouter)
    .use(`/flower-image`, flowerIMGRouter)
    .use(notFoundError);

export default router;
