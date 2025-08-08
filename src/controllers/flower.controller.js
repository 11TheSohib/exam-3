import { Roles } from '../const/index.js';
import { AppError } from '../errors/AppError.js';
import Category from '../models/category.model.js';
import Flower from '../models/flower.model.js';
import User from '../models/user.model.js';
import { successRes } from '../utils/success-res.js';
import { BaseController } from './base.controller.js';

class flowerController extends BaseController {
    constructor() {
        super(Flower, ['flowers', 'categoryId', 'sallerId']);
    }

    async createFLower(req, res, next) {
        try {
            const { quantity, price, sallerId, categoryId } = req.body;

            const checkSaller = await User.findOne({
                role: Roles.saller,
                sallerId,
            });
            if (!checkSaller)
                throw new AppError(`Saller id is not defined`, 404);

            const checkCategory = await Category.findById(categoryId);
            if (!checkCategory)
                throw new AppError(`Category id is not defined`, 404);

            if (price < 0 || quantity < 0)
                throw new AppError(`price or quantity less than 0`, 400);

            const flower = await Flower.create(req.body);
            return successRes(res, flower, 201);
        } catch (error) {
            next(error);
        }
    }

    async sortPriceFlowers(req, res, next) {
        try {
            const { order = 'asc' } = req.query;
            const sortOrder = order === 'desc' ? -1 : 1;

            const flowers = await Flower.find()
                .populate('categoryId')
                .populate('sallerId')
                .sort({ price: sortOrder });

            return successRes(res, flowers);
        } catch (error) {
            next(error);
        }
    }

    async flowersToUser(req, res, next) {
        try {
            const id = req.params?.id;

            const user = await User.findOne({ role: Roles.saller, id });
            if (!user) throw new AppError(`Forbiddin user`, 400);

            const userFlowers = await Flower.find({ sallerId: id });
            return successRes(res, {
                sallerId: id,
                ...userFlowers,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new flowerController();
