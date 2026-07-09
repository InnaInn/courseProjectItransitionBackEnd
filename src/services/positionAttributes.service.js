import * as positionAttributeRepo from '../repositories/positionAttributes.repository.js';
import { v7 as uuidv7 } from 'uuid';
    
export const getPositionAttributes = async (positionsId) => {
    const positionAttributes = await positionAttributeRepo.findPositionAttributesByPositionId(positionsId);
    return positionAttributes;
};

export const createPositionAttribute = async (positionId, positionAttributeData) => {
    positionAttributeData.positionId = positionId;
    await positionAttributeRepo.createPositionAttribute(positionAttributeData);
};

export const deletePositionAttribute = async (positionId, attributeId) => {
    await positionAttributeRepo.deletePositionAttribute(positionId, attributeId);
};
