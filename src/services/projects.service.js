import * as projectRepo from '../repositories/projects.repository.js';
import { v7 as uuidv7 } from 'uuid';

export const getProjectsByUserId = async (userId) => {
    return projectRepo.findProjectsByUserId(userId);
};

export const createProject = async (projectData) => {
    projectData.id = uuidv7();
    await projectRepo.createProject(projectData);
    return projectData.id;
};

export const updateProjectInfo = async (id, projectData) => {
    const existing = await projectRepo.findProjectById(id);
    if (!existing) throw new Error('Project not found');

    await projectRepo.updateProjectInfo(id, projectData);
};

export const deleteProject = async (id) => {
    const existing = await projectRepo.findProjectById(id);
    if (!existing) throw new Error('Project not found');
    await projectRepo.deleteProject(id);
};
