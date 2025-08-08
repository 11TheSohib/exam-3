import { Router } from 'express';
import orderController from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter
    .post(`/`, orderController.createOrder)
    .get(`/`, orderController.findAll)
    .get(`/:id`, orderController.findById)
    .patch(`/:id`, orderController.update)
    .delete(`/:id`, orderController.delete);

export default orderRouter;
