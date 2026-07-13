import * as positionUsersRepo from '../repositories/positionUsers.repository.js';
import { v7 as uuidv7 } from 'uuid';
    
export const getPositionUsers = async (positionId) => {
    const positionUsers = await positionUsersRepo.findUsersByPositionId(positionId);
    return positionUsers;
};

export const getUserPositions = async (userId) => {
    const userPositions = await positionUsersRepo.findPositionsByUserId(userId);
    return userPositions;
};

export const createPositionUser = async (userId, positionAttributeData) => {
    positionAttributeData.userId = userId;
    await positionUsersRepo.createPositionUser(positionAttributeData);
};


export const deleteUserPosition = async (userId, positionId) => {
    await positionUsersRepo.deletePositionUser(userId, positionId);
};
