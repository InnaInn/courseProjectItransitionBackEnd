import { Router } from 'express';
import * as attributeController from '../controllers/attributes.controller.js';
import { isAuthenticated, isAuthorized, hasRole } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER', 'CANDIDATE')),
    attributeController.listAttributes);
router.post('/',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    attributeController.addAttribute);
router.put('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    attributeController.editAttributeInfo);
router.delete('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    attributeController.removeAttribute);

export default router;