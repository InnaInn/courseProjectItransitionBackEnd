import * as positionRepo from '../repositories/positions.repository.js';
import * as positionAttributesRepo from '../repositories/positionAttributes.repository.js'
import { v7 as uuidv7 } from 'uuid';

export const getAllPositions = async (positionPrefix) => {
    return positionRepo.findAllPositions(positionPrefix);
};

export const getPosition = async (id) => {
    const position = await positionRepo.findPositionById(id);
    if (!position) throw new Error('Position not found');
    return position;
};

export const duplicatePosition = async(id) => {
    const currentPosition =  await getPosition(id);
    currentPosition.name = currentPosition.name + ' (copy)'
    const newPostitionId = await createPosition(currentPosition);
    const attributes = await positionAttributesRepo.findPositionAttributesByPositionId(id);
    for (let attribute of attributes) {
        positionAttributesRepo.createPositionAttribute({
            positionId: newPostitionId,
            attributeId: attribute.id 
        });
    }
    return newPostitionId;
}

export const createPosition = async (positionData) => {
    positionData.id = uuidv7();
    await positionRepo.createPosition(positionData);
    return positionData.id;
};

export const updatePositionInfo = async (id, positionData) => {
    const existing = await positionRepo.findPositionById(id);
    if (!existing) throw new Error('Position not found');

    await positionRepo.updatePositionInfo(id, positionData);
};

export const deletePosition = async (id) => {
    const existing = await positionRepo.findPositionById(id);
    if (!existing) throw new Error('Position not found');
    await positionRepo.deletePosition(id);
};
