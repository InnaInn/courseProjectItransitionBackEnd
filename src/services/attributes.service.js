import * as attributeRepo from '../repositories/attributes.repository.js';
import { v7 as uuidv7 } from 'uuid';

export const getAllAttributes = async () => {
    return attributeRepo.findAllAttributes();
};


export const createAttribute = async (attributeData) => {
    attributeData.id = uuidv7();
    await attributeRepo.createAttribute(attributeData);
    return attributeData.id;
};

export const updateAttributeInfo = async (id, attributeData) => {
    const existing = await attributeRepo.findAttributeById(id);
    if (!existing) throw new Error('Attribute not found');

    await attributeRepo.updateAttributeInfo(id, attributeData);
};

export const deleteAttribute = async (id) => {
    const existing = await attributeRepo.findAttributeById(id);
    if (!existing) throw new Error('Attribute not found');
    await attributeRepo.deleteAttribute(id);
};
