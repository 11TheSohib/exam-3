import { Router } from 'express';
import walletController from '../controllers/wallet.controller.js';

const walletRouter = Router();

walletRouter
    .post(`/`, walletController.create)
    .get(`/`, walletController.findAll)
    .get(`/:id`, walletController.findById)
    .patch(`/:id`, walletController.update)
    .delete(`/:id`, walletController.delete);

export default walletRouter;
