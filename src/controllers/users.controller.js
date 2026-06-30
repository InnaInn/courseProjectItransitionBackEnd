import * as userService from '../services/users.service.js';

export const listUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const addUser = async (req, res, next) => {
    try {
        const newUserId = await userService.createUser(req.body);
        res.status(201).json({ id: newUserId });
    } catch (err) {
        next(err);
    }
};

export const editUser = async (req, res, next) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const removeUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
