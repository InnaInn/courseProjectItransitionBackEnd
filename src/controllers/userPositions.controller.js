import * as userPositionsService from '../services/userPositions.service.js';

export const listUsersByPositionId = async (req, res, next) => {
    try {
        const positionUsers = await userPositionsService.getPositionUsers(req.params.positionId);
        res.status(200).json(positionUsers);
    } catch (err) {
        next(err);
    }
};

export const listPositionsByUserId = async (req, res, next) => {
    try {
        const positionUsers = await userPositionsService.getUserPositions(req.params.userId);
        res.status(200).json(positionUsers);
    } catch (err) {
        next(err);
    }
};

export const addUserPosition = async (req, res, next) => {
    try {
        await userPositionsService.createPositionUser(req.params.userId, req.body);
        res.status(201).json();
    } catch (err) {
        next(err);
    }
};

export const removeUserPosition = async (req, res, next) => {
    try {
        await userPositionsService.deletePositionUser(req.params.userId, req.params.positionId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};