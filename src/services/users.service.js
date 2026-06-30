import * as userRepo from '../repositories/users.repository.js';
import { v7 as uuidv7 } from 'uuid';

export const getAllUsers = async () => {
    return userRepo.findAllUsers();
};

export const getUser = async (id) => {
    const user = await userRepo.findUserById(id);
    if (!user) throw new Error('User not found');
    return user;
};

export const createUser = async (userData) => {
    userData.id = uuidv7();
    userData.roleId = 'CANDIDATE';
    await userRepo.createUser(userData);
    return userData.id;
};

export const updateUser = async (id, userData) => {
    const existing = await userRepo.findUserById(id);
    if (!existing) throw new Error('User not found');

    await userRepo.updateUser(id, userData);
};

export const deleteUser = async (id) => {
    const existing = await userRepo.findUserById(id);
    if (!existing) throw new Error('User not found');
    await userRepo.deleteUser(id);
};