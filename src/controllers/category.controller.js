import Category from '../models/category.model.js';
import { BaseController } from './base.controller.js';

class CategoryController extends BaseController {
    constructor() {
        super(Category, ['flowers']);
    }
}

export default new CategoryController();
