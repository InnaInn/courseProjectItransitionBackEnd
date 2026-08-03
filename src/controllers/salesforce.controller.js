
import { createAccountAndContact, getSalesforceConnection } from '../services/salesforce.service.js';
import * as userService from '../services/users.service.js';

export const testConnection = async (req, res) => {
    try {
        const conn = await getSalesforceConnection();
        res.json({ success: true, message: 'Salesforce connected successfully' });
    } catch (err) {
        console.error('Test connection error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

export const createSalesforceRecord = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { additionalData } = req.body;

        const user = await userService.getUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await createAccountAndContact(user, additionalData);

        if (result.alreadyExists) {
            return res.status(200).json({
                success: true,
                message: 'Contact already exists in Salesforce',
                alreadyExists: true,
                contactId: result.contactId,
            });
        }

        res.status(201).json({
            success: true,
            message: 'Account and Contact created successfully in Salesforce',
            ...result,
        });
    } catch (err) {
        console.error('Controller error:', err);
        next(err);
    }
};