import db from '../config/database.js';

function convertCategoryToSnakeCase(categoryData) {
    return {
        id: categoryData.id,
        value: categoryData.value
        
    }
}

function convertCategoryToCamelCase(row) {
    return {
        id: row.id,
        value: row.value
        
    }
}

export const findAllCategories = async () => {
    const rows = await db('categories')
        .select(
            'categories.id',
            'categories.value'
        );

    return rows.map(convertCategoryToCamelCase);
};

export const findCategoryById = async (id) => {
    const row = await db('categories')
        .select('categories.*')
        .where('categories.id', id)
        .first();

    return convertCategoryToCamelCase(row);
};