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

export const findAllPositions = async () => {
    const rows = await db('position')
        .select(
            'position.id',
            'position.name',
            'position.description',
        );

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
