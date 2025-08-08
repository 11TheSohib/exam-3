import Payment from '../models/payment.model.js';
import { BaseController } from './base.controller.js';

class paymentController extends BaseController {
    constructor() {
        super(Payment, [`clientId`, `orderId`]);
    }
}

export default new paymentController();
