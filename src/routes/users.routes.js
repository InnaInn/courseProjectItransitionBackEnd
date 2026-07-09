import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';
import * as userAttributesController from '../controllers/usersAttributes.controller.js'
import {isAuthenticated, isAuthorized, hasRole, isUserOwnResource} from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/:userId/attributes',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER'), isUserOwnResource),
    userAttributesController.listAttributesByUserId);
router.post('/:userId/attributes', userAttributesController.addUserAttribute);
router.put('/:userId/attributes/:attributeId', userAttributesController.editUserAttribute);
router.delete('/:userId/attributes/:attributeId', userAttributesController.removeUserAttribute);

router.get('/', userController.listUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:userId', userController.editUserInfo);
router.put('/:userId/role', userController.editUserRole);
router.delete('/:userId', userController.removeUser);

export default router;
