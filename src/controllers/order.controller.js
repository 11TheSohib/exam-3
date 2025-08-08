import Flower from '../models/flower.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import { successRes } from '../utils/success-res.js';
import { BaseController } from './base.controller.js';

class OrderController extends BaseController {
    constructor() {
        super(Order, [`flowerId`, `clientId`]);
    }

    async createOrder(req, res, next) {
        try {
            const { quantity, flowerId, clientId } = req.body;
            if (quantity < 0) throw new AppError(`Quantity less than 0`, 400);

            const checkClient = await User.findById(clientId);
            if (!checkClient) throw new AppError(`Client is not found`, 404);

            const checkFlower = await Flower.findById(flowerId);
            if (!checkFlower) throw new AppError(`Flower is not found`, 404);

            const totalPrice = quantity * checkFlower.price;

            const order = await Order.create({
                ...req.body,
                totalPrice,
            });

            return successRes(res, order);
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();
