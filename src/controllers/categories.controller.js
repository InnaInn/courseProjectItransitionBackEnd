import * as categoryService from '../services/categories.service.js';

export const listCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        next(err);
    }
};