import db from '../config/database.js';

function convertProjectToSnakeCase(projectData) {
    return {
        id: projectData.id,
        user_id: projectData.userId,
        name: projectData.name,
        description: projectData.description,
        start_date: projectData.startDate,
        end_date: projectData.endDate
    }
}

function convertProjectToCamelCase(row) {
    if (row) {
        return {
            id: row.id,
            userId: row.user_id,
            name: row.name,
            description: row.description,
            startDate: row.start_date,
            endDate: row.end_date
        }
    }
}

export const findProjectsByUserId = async (userId) => {
    const rows = await db('projects')
        .select(
            'projects.id',
            'projects.user_id',
            'projects.name',
            'projects.description',
            'projects.start_date',
            'projects.end_date'
        )
        .where('projects.user_id', userId)
        .orderBy('projects.start_date')

    return rows.map(convertProjectToCamelCase);
};

export const findProjectById = async (id) => {
    const row = await db('projects')
        .select('projects.*')
        .where('projects.id', id)
        .first();

    return convertProjectToCamelCase(row);
};

export const createProject = async (projectData) => {
    return db('projects')
        .insert(convertProjectToSnakeCase(projectData));
};

export const updateProjectInfo = async (id, projectData) => {
    return db('projects')
        .where({ id })
        .update({
            name: projectData.name,
            description: projectData.description,
            start_date: projectData.startDate,
            end_date: projectData.endDate
        });
};

export const deleteProject = async (id) => {
    return db('projects')
        .where({ id })
        .delete();
};