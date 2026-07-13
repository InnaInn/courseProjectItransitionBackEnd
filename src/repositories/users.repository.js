import db from '../config/database.js';

function convertUserToSnakeCase(userData) {
    return {
        id: userData.id,
        role_id: userData.roleId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        photo_url: userData.photoUrl,
        position: userData.position,
        summary: userData.summary,
        password: userData.password
    }
}

function convertUserToCamelCase(row) {
    if (row) {
        return {
            id: row.id,
            roleId: row.role_id,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email,
            phone: row.phone,
            address: row.address,
            photoUrl: row.photo_url,
            position: row.position,
            summary: row.summary,
            password: row.password
        }
    }
}

export const findAllUsers = async () => {
    const rows = await db('users')
        .select(
            'users.id',
            'users.role_id',
            'users.first_name',
            'users.last_name',
            'users.email'
        );

    return rows.map(convertUserToCamelCase);
};

export const findUserById = async (id) => {
    const row = await db('users')
        .select('users.*')
        .where('users.id', id)
        .first();

    return convertUserToCamelCase(row);
};

export const findUserByEmail = async (email, password) => {
    const row = await db('users')
        .where({
            email: email,
            password: password
        })
        .first();

    return convertUserToCamelCase(row);
};

export const createUser = async (userData) => {
    return db('users')
        .insert(convertUserToSnakeCase(userData));
};

export const updateUserInfo = async (id, userData) => {
    return db('users')
        .where({ id })
        .update(convertUserToSnakeCase(userData));
};

export const updateUserRole = async (id, role) => {
    return db('users')
        .where({ id })
        .update({
            role_id: role
        });
};

export const deleteUser = async (id) => {
    return db('users')
        .where({ id })
        .delete();
};
