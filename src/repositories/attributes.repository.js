import db from '../config/database.js';

function convertAttributeToSnakeCase(attributeData) {
    return {
        id: attributeData.id,
        category_id: attributeData.categoryId,
        type: attributeData.type,
        values: attributeData.values,
        name: attributeData.name
    }
}

function convertAttributeToCamelCase(row) {
    return {
        id: row.id,
        categoryId: row.category_id,
        categoryValue: row.category_value,
        type: row.type,
        values: row.values,
        name: row.name,  
    }
}

export const findAllAttributes = async () => {
    const rows = await db('attributes')
        .leftJoin('categories', 'attributes.category_id', '=', 'categories.id')
        .select(
            'attributes.id',
            'categories.value as category_value',
            'attributes.type',
            'attributes.values',
            'attributes.name'
        );

    return rows.map(convertAttributeToCamelCase);
};



export const findAttributeById = async (id) => {
    const row = await db('attributes')
        .select('attributes.*')
        .where('attributes.id', id)
        .first();

    return convertAttributeToCamelCase(row);
};


export const createAttribute = async (attributeData) => {
    return db('attributes')
        .insert(convertAttributeToSnakeCase(attributeData));
};

export const updateAttributeInfo = async (id, attributeData) => {
    return db('attributes')
        .where({ id })
        .update(convertAttributeToSnakeCase(attributeData));
};

export const deleteAttribute = async (id) => {
    return db('attributes')
        .where({ id })
        .delete();
};
