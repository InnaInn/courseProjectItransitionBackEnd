import * as userAttributesService from '../services/userAttributes.service.js';

export const listAttributesByUserId = async (req, res, next) => {
    try {
        const usersAttributes = await userAttributesService.getUserAttributes(req.params.userId);
        res.status(200).json(usersAttributes);
    } catch (err) {
        next(err);
    }
};

export const addUserAttribute = async (req, res, next) => {
    try {
        await userAttributesService.createUserAttribute(req.params.userId, req.body);
        res.status(201).json();
    } catch (err) {
        next(err);
    }
};

export const editUserAttribute = async (req, res, next) => {
    try {
        const updated = await userAttributesService.updateUserAttribute(req.params.userId,
                                                                        req.params.attributeId,
                                                                        req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const removeUserAttribute = async (req, res, next) => {
    try {
        await userAttributesService.deleteUserAttribute(req.params.userId, req.params.attributeId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};