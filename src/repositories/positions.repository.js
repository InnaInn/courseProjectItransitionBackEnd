import db from '../config/database.js';

function convertPositionToSnakeCase(positionData) {
    return {
        id: positionData.id,
        name: positionData.name,
        description: positionData.description
        
    }
}

function convertPositionToCamelCase(row) {
    return {
        id: row.id,
        name: row.name,
        description: row.description
        
    }
}

export const findAllPositions = async (positionPrefix) => {
    let query = db('position')
        .select(
            'position.id',
            'position.name',
            'position.description',
        );
    
    if (positionPrefix !== undefined && positionPrefix.trim() !== '') {
        query = query.where('position.name', 'ilike', `${positionPrefix.trim()}%`);
    }
    
    const rows = await query;
    return rows.map(convertPositionToCamelCase);
};

export const findPositionById = async (id) => {
    const row = await db('position')
        .select('position.*')
        .where('position.id', id)
        .first();

    return convertPositionToCamelCase(row);
};

export const createPosition = async (positionData) => {
    return db('position')
        .insert(convertPositionToSnakeCase(positionData));
};

export const updatePositionInfo = async (id, positionData) => {
    return db('position')
        .where({ id })
        .update(convertPositionToSnakeCase(positionData));
};

export const deletePosition = async (id) => {
    return db('position')
        .where({ id })
        .delete();
};