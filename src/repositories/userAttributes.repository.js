import db from '../config/database.js';

function convertUserAttributeToSnakeCase(userAttributeData) {
    return {
        user_id: userAttributeData.userId,
        attribute_id: userAttributeData.attributeId,
        value: userAttributeData.value
    }
}

function convertUserAttributeToCamelCase(row) {
    return {
        id: row.id,
        categoryValue: row.category_value,
        type: row.type,
        name: row.name,  
        userId: row.user_id,  
        value: row.value  
    }
}

export const findUserAttributesByUserId = async (userId) => {
    const rows = await db('attributes')
        .leftJoin('categories', 'attributes.category_id', '=', 'categories.id')
        .join('user_attributes', 'attributes.id', '=', 'user_attributes.attribute_id')
        .select(
            'attributes.id',
            'categories.value as category_value',
            'attributes.type',
            'attributes.name',
            'user_attributes.user_id',
            'user_attributes.value'
        )
        .where('user_attributes.user_id', userId);

    return rows.map(convertUserAttributeToCamelCase);
};

export const createUserAttribute = async (userAttributeData) => {
    return db('user_attributes')
        .insert(convertUserAttributeToSnakeCase(userAttributeData));
};

export const updateUserAttribute = async (userId, attributeId, value) => {
    return db('user_attributes')
        .where({
            'user_id': userId,
            'attribute_id': attributeId
        })
        .update({
            'value': value
        });
};

export const deleteUserAttribute = async (userId, attributeId) => {
    return db('user_attributes')
        .where({
            'user_id': userId,
            'attribute_id': attributeId
        })
        .delete();
};