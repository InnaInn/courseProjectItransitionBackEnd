import * as userAttributeRepo from '../repositories/userAttributes.repository.js';
import { v7 as uuidv7 } from 'uuid';
    
export const getUserAttributes = async (usersId) => {
    const userAttributes = await userAttributeRepo.findUserAttributesByUserId(usersId);
    return userAttributes;
};

export const createUserAttribute = async (userId, userAttributeData) => {
    userAttributeData.userId = userId;
    await userAttributeRepo.createUserAttribute(userAttributeData);
};

export const updateUserAttribute = async (userId, attributeId, userAttributeData) => {
    await userAttributeRepo.updateUserAttribute(userId, attributeId, userAttributeData.value);
};

export const deleteUserAttribute = async (userId, attributeId) => {
    await userAttributeRepo.deleteUserAttribute(userId, attributeId);
};
