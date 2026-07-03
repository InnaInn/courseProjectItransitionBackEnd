import { Router } from 'express';
import * as attributeController from '../controllers/attributes.controller.js';

const router = Router();

router.get('/', attributeController.listAttributes);
router.post('/', attributeController.addAttribute);
router.put('/:id', attributeController.editAttributeInfo);
router.delete('/:id', attributeController.removeAttribute);

export default router;