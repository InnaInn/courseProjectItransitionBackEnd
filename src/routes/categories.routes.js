import { Router } from 'express';
import * as categoryController from '../controllers/categories.controller.js';

const router = Router();

router.get('/', categoryController.listCategories);


export default router;