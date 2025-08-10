import { Router } from 'express';

import { notFoundError } from '../errors/not-found.error.js';
import adminRouter from './admin.route.js';
import clientRouter from './client.route.js';
import flowerIMGRouter from './flower-image.route.js';
import flowerRouter from './flower.route.js';
import deliverRouter from './deliver.route.js';
import categoryRouter from './category.route.js';
import orderRouter from './order.route.js';
import paymentRouter from './payment.route.js';
import sallerRouter from './saller.route.js';
import walletRouter from './wallet.route.js';



const router = Router();

router
    .use(`/admin`, adminRouter)
    .use(`/client`, clientRouter)
    .use(`/flower-image`, flowerIMGRouter)
    .use(`/flower`, flowerRouter)
    .use(`/deliver`, deliverRouter)
    .use(`/category`, categoryRouter)
    .use(`/order`, orderRouter)
    .use(`/payment`, paymentRouter)
    .use(`/saller`, sallerRouter)
    .use(`/wallet`, walletRouter)
    .use(notFoundError);

export default router;
