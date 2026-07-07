import { Router } from 'express';
import * as projectController from '../controllers/projects.controller.js';

const router = Router();

router.get('/', projectController.listProjectsForUser);
router.post('/', projectController.addProject);
router.put('/:id', projectController.editProjectInfo);
router.delete('/:id', projectController.removeProject);

export default router;