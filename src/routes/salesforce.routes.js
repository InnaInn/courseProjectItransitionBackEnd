
import express from 'express';
import { createSalesforceRecord, testConnection } from '../controllers/salesforce.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
    '/users/:userId/salesforce',
    isAuthenticated,
    createSalesforceRecord
);

router.get('/test', testConnection);

export default router;