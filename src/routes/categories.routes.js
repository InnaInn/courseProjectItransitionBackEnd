import { Router } from 'express';
import * as categoryController from '../controllers/categories.controller.js';
import { isAuthenticated, isAuthorized, hasRole } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/', isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER', 'CANDIDATE')),
    categoryController.listCategories);


export default router;