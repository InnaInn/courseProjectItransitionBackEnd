import db from '../config/database.js';

function convertPositionUserToSnakeCase(positionUserData) {
    return {
        position_id: positionUserData.positionId,
        user_id: positionUserData.userId,
    }
}

function convertPositionUserToCamelCase(row) {
    return {
        positionId: row.position_id,
        userId: row.user_id,
        userFirstName: row.first_name,
        userLastName: row.last_name,
        positionName: row.position_name
    }
}

export const findUsersByPositionId = async (positionId) => {
    const rows = await db('position_users')
        .join('users', 'users.id', '=', 'position_users.user_id')
        .select(
            'position_users.position_id',
            'position_users.user_id',
            'users.first_name',
            'users.last_name',
        )
        .where('position_users.position_id', positionId);

    return rows.map(convertPositionUserToCamelCase);
};

export const findPositionsByUserId = async (userId) => {
    const rows = await db('position_users')
        .join('position', 'position.id', '=', 'position_users.position_id')
        .select(
            'position_users.position_id',
            'position.name as position_name',
            'position_users.user_id',
        )
        .where('position_users.user_id', userId);

    return rows.map(convertPositionUserToCamelCase);
};

export const createPositionUser = async (positionUserData) => {
    return db('position_users')
        .insert(convertPositionUserToSnakeCase(positionUserData));
};

export const deletePositionUser = async (userId, positionId) => {
    return db('position_users')
        .where({
            'user_id': userId,
            'position_id': positionId
        })
        .delete();
};