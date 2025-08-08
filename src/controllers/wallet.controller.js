import Wallet from '../models/wallet.model.js';
import { BaseController } from './base.controller.js';

class walletController extends BaseController {
    constructor() {
        super(Wallet, [`clientId`, `orderId`]);
    }
}

export default walletController;
