import * as positionService from '../services/positions.service.js';

export const listPositions = async (req, res, next) => {
    try {
        const positions = await positionService.getAllPositions(req.query.positionPrefix);
        res.status(200).json(positions);
    } catch (err) {
        next(err);
    }
};


export const getPositionById = async (req, res, next) => {
    try {
        const position = await positionService.getPosition(req.params.id);
        res.status(200).json(position);
    } catch (err) {
        next(err);
    }
};

export const addPosition = async (req, res, next) => {
    try {
        const newPositionId = await positionService.createPosition(req.body);
        res.status(201).json({ id: newPositionId });
    } catch (err) {
        next(err);
    }
};

export const editPositionInfo = async (req, res, next) => {
    try {
        const updated = await positionService.updatePositionInfo(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const duplicatePosition = async (req, res, next) => {
    try {
        const duplicatedPositionId = await positionService.duplicatePosition(req.params.id);
        res.status(200).json({ id: duplicatedPositionId });
    } catch (err) {
        next(err);
    }
};

export const removePosition = async (req, res, next) => {
    try {
        await positionService.deletePosition(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};