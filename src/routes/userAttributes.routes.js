import { Router } from 'express';
import * as userAttributesController from '../controllers/usersAttributes.controller.js'

const router = Router();

router.get('/', userAttributesController.listAttributesByUserId);
router.post('/', userAttributesController.addUserAttribute);
router.put('/:attributeId', userAttributesController.editUserAttribute);
router.delete('/:attributeId', userAttributesController.removeUserAttribute);

export default router;