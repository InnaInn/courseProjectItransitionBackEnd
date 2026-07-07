import { Router } from 'express';
import * as positionController from '../controllers/positions.controller.js';

const router = Router();

router.get('/', positionController.listPositions);
router.post('/', positionController.addPosition);
router.put('/:id', positionController.editPositionInfo);
router.delete('/:id', positionController.removePosition);


export default router;