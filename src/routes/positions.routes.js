import { Router } from 'express';
import * as positionController from '../controllers/positions.controller.js';
import * as positionAttributesController from '../controllers/positionsAttributes.controller.js'
import * as userPositionsController from '../controllers/userPositions.controller.js'
import { isAuthenticated, isAuthorized, hasRole } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/:positionId/users',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    userPositionsController.listUsersByPositionId);

router.get('/:positionId/attributes',
    positionAttributesController.listAttributesByPositionId);
router.post('/:positionId/attributes',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionAttributesController.addPositionAttribute);
router.delete('/:positionId/attributes/:attributeId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionAttributesController.removePositionAttribute);

router.get('/', positionController.listPositions);                                    
router.get('/:id', positionController.getPositionById);                        
router.post('/',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.addPosition);
router.post('/:id/duplicate',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.duplicatePosition);
router.put('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.editPositionInfo);
router.delete('/:id',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    positionController.removePosition);

export default router;