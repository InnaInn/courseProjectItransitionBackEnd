import * as positionAttributesService from '../services/positionAttributes.service.js';

export const listAttributesByPositionId = async (req, res, next) => {
    try {
        const positionsAttributes = await positionAttributesService.getPositionAttributes(req.params.positionId);
        res.status(200).json(positionsAttributes);
    } catch (err) {
        next(err);
    }
};

export const addPositionAttribute = async (req, res, next) => {
    try {
        await positionAttributesService.createPositionAttribute(req.params.positionId, req.body);
        res.status(201).json();
    } catch (err) {
        next(err);
    }
};

export const removePositionAttribute = async (req, res, next) => {
    try {
        await positionAttributesService.deletePositionAttribute(req.params.positionId, req.params.attributeId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};