import db from '../config/database.js';

function convertPositionAttributeToSnakeCase(positionAttributeData) {
    return {
        position_id: positionAttributeData.positionId,
        attribute_id: positionAttributeData.attributeId
       
    }
}

function convertPositionAttributeToCamelCase(row) {
    return {
        id: row.id,
        categoryValue: row.category_value,
        type: row.type,
        name: row.name,  
        positionId: row.position_id
    }
}

export const findPositionAttributesByPositionId = async (positionId) => {
    const rows = await db('attributes')
        .leftJoin('categories', 'attributes.category_id', '=', 'categories.id')
        .join('position_attributes', 'attributes.id', '=', 'position_attributes.attribute_id')
        .select(
            'attributes.id',
            'categories.value as category_value',
            'attributes.type',
            'attributes.name',
            'position_attributes.position_id'
        )
        .where('position_attributes.position_id', positionId);

    return rows.map(convertPositionAttributeToCamelCase);
};

export const createPositionAttribute = async (positionAttributeData) => {
    return db('position_attributes')
        .insert(convertPositionAttributeToSnakeCase(positionAttributeData));
};

export const deletePositionAttribute = async (positionId, attributeId) => {
    return db('position_attributes')
        .where({
            'position_id': positionId,
            'attribute_id': attributeId
        })
        .delete();
};