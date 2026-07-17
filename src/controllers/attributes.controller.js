import * as attributeService from '../services/attributes.service.js';

export const listAttributes = async (req, res, next) => {
    try {
        const attributePrefix = req.query.attributePrefix;
        const attributes = await attributeService.getAllAttributes(attributePrefix);
        res.status(200).json(attributes);
    } catch (err) {
        next(err);
    }
};


export const addAttribute = async (req, res, next) => {
    try {
        const newAttributeId = await attributeService.createAttribute(req.body);
        res.status(201).json({ id: newAttributeId });
    } catch (err) {
        next(err);
    }
};

export const editAttributeInfo = async (req, res, next) => {
    try {
        const updated = await attributeService.updateAttributeInfo(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const removeAttribute = async (req, res, next) => {
    try {
        await attributeService.deleteAttribute(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
