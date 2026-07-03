import * as categoryRepo from '../repositories/categories.repository.js';
import { v7 as uuidv7 } from 'uuid';

export const getAllCategories = async () => {
    return categoryRepo.findAllCategories();
};
