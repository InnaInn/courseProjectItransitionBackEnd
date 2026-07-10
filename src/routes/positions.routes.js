import { Router } from 'express';
import * as positionController from '../controllers/positions.controller.js';
import * as positionAttributesController from '../controllers/positionsAttributes.controller.js'
import { isAuthenticated, isAuthorized, hasRole } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/:positionId/attributes',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER', 'CANDIDATE')),
    positionAttributesController.listAttributesByPositionId);
router.post('/:positionId/attributes',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionAttributesController.addPositionAttribute);
router.delete('/:positionId/attributes/:attributeId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionAttributesController.removePositionAttribute);

router.get('/',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER', 'CANDIDATE')),
    positionController.listPositions);
router.get('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER', 'CANDIDATE')),
    positionController.getPositionById);
router.post('/',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.addPosition);
router.put('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.editPositionInfo);
router.delete('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.removePosition);


export default router;