import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';

const router = Router();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.removeUser);

export default router;
