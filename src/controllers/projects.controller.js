import * as projectService from '../services/projects.service.js';

export const listProjectsForUser = async (req, res, next) => {
    try {
        const projects = await projectService.getProjectsByUserId(req.params.userId);
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
};

export const addProject = async (req, res, next) => {
    try {
        req.body.userId = req.params.userId;
        const newProjectId = await projectService.createProject(req.body);
        res.status(201).json({ id: newProjectId });
    } catch (err) {
        next(err);
    }
};

export const editProjectInfo = async (req, res, next) => {
    try {
        req.body.userId = req.params.userId;
        const updated = await projectService.updateProjectInfo(req.params.projectId, req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const removeProject = async (req, res, next) => {
    try {
        await projectService.deleteProject(req.params.projectId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};