import { Router } from 'express';
import * as positionController from '../controllers/positions.controller.js';
import * as positionAttributesController from '../controllers/positionsAttributes.controller.js'

const router = Router();

router.get('/:positionId/attributes', positionAttributesController.listAttributesByPositionId);
router.post('/:positionId/attributes', positionAttributesController.addPositionAttribute);
router.delete('/:positionId/attributes/:attributeId', positionAttributesController.removePositionAttribute);

router.get('/', positionController.listPositions);
router.get('/:id', positionController.getPositionById);
router.post('/', positionController.addPosition);
router.put('/:id', positionController.editPositionInfo);
router.delete('/:id', positionController.removePosition);


export default router;