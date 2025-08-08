import { Router } from 'express';
import paymentController from '../controllers/payment.controller.js';

const paymentRouter = Router();

paymentRouter
    .post(`/`, paymentController.create)
    .get(`/`, paymentController.findAll)
    .get(`/:id`, paymentController.findById)
    .patch(`/:id`, paymentController.update)
    .delete(`/:id`, paymentController.delete);

export default paymentRouter;
