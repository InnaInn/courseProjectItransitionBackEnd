import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';
import * as userAttributesController from '../controllers/usersAttributes.controller.js'
import * as projectController from '../controllers/projects.controller.js';
import { isAuthenticated, isAuthorized, hasRole, isUserOwnResource } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/:userId/attributes',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER'), isUserOwnResource),
    userAttributesController.listAttributesByUserId);
router.post('/:uerId/attributes',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    userAttributesController.addUserAttribute);
router.put('/:userId/attributes/:attributeId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    userAttributesController.editUserAttribute);
router.delete('/:userId/attributes/:attributeId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    userAttributesController.removeUserAttribute);

router.get('/:userId/projects',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER'), isUserOwnResource),
    projectController.listProjectsForUser);
router.post('/:userId/projects',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    projectController.addProject);
router.put('/:userId/projects/:projectId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    projectController.editProjectInfo);
router.delete('/:userId/projects/:projectId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    projectController.removeProject);

router.get('/',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER')),
    userController.listUsers);
router.get('/:userId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN', 'RECRUITER'), isUserOwnResource),
    userController.getUserById);
router.post('/',
    userController.addUser);
router.put('/:userId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN'), isUserOwnResource),
    userController.editUserInfo);
router.put('/:userId/role',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN')),
    userController.editUserRole);
router.delete('/:userId',
    isAuthenticated,
    isAuthorized(hasRole('ADMIN')),
    userController.removeUser);

export default router;
