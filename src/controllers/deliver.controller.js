import Deliver from '../models/deliver.model.js';
import { BaseController } from './base.controller.js';

class DeliverController extends BaseController {
    constructor() {
        super(Deliver, ['orderId']);
    }
}

export default new DeliverController();
