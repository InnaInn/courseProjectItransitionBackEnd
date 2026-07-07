import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';
import * as userAttributesController from '../controllers/usersAttributes.controller.js'

const router = Router();

router.get('/:userId/attributes', userAttributesController.listAttributesByUserId);
router.post('/:userId/attributes', userAttributesController.addUserAttribute);
router.put('/:userId/attributes/:attributeId', userAttributesController.editUserAttribute);
router.delete('/:userId/attributes/:attributeId', userAttributesController.removeUserAttribute);

router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:id', userController.editUserInfo);
router.put('/:id/role', userController.editUserRole);
router.delete('/:id', userController.removeUser);

export default router;
