import FlowerImage from '../models/flower-image.model.js';
import { successRes } from '../utils/success-res.js';
import { BaseController } from './base.controller.js';

class flowerImageController extends BaseController {
    constructor() {
        super(FlowerImage, ['flowerId']);
    }

    async craetImage(req, res, next) {
        try {
            const flowerImage = await FlowerImage.create({
                ...req.body,
                imageURL: req?.file?.filename ?? '',
            });

            return successRes(res, flowerImage);
        } catch (error) {
            next(error);
        }
    }
}

export default new flowerImageController();
