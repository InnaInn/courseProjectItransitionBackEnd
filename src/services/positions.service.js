import * as positionRepo from '../repositories/positions.repository.js';
import { v7 as uuidv7 } from 'uuid';

export const getAllPositions = async () => {
    return positionRepo.findAllPositions();
};

export const getPosition = async (id) => {
    const position = await positionRepo.findPositionById(id);
    if (!position) throw new Error('Position not found');
    return position;
};


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
