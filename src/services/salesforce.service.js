import jsforce from 'jsforce';
import config from '../config/config.js';

const SF_USERNAME = config.salesforce.username;
const SF_PASSWORD = config.salesforce.password;
const SF_SECURITY_TOKEN = config.salesforce.securityToken;

let sfConnection = null;

export const getSalesforceConnection = async () => {
    if (sfConnection && sfConnection.accessToken) {
        return sfConnection;
    }

    try {
        const conn = new jsforce.Connection({
            loginUrl: 'https://login.salesforce.com'
        });

        await conn.login(SF_USERNAME, SF_PASSWORD + SF_SECURITY_TOKEN);
        
        sfConnection = conn;
        return sfConnection;
    } catch (err) {
        console.error('Salesforce connection error:', err);
        throw new Error(`Failed to connect to Salesforce: ${err.message}`);
    }
};

export const createAccountAndContact = async (userData, additionalData) => {
    try {
        const conn = await getSalesforceConnection();

        try {
            const existingContact = await conn.sobject('Contact')
                .find({ Email: userData.email })
                .execute();

            if (existingContact && existingContact.length > 0) {
                return {
                    success: true,
                    message: 'Contact already exists in Salesforce',
                    contactId: existingContact[0].Id,
                    alreadyExists: true,
                };
            }
        } catch (findErr) {
            // Contact not found, continue
        }

        const accountResult = await conn.sobject('Account').create({
            Name: additionalData.companyName || `${userData.firstName} ${userData.lastName}`,
            Phone: userData.phone || additionalData.phone || '',
            Website: additionalData.website || '',
            Description: additionalData.description || '',
            Type: additionalData.accountType || 'Customer',
            Industry: additionalData.industry || 'Technology',
        });

        if (!accountResult.success) {
            throw new Error(`Account creation failed: ${JSON.stringify(accountResult.errors)}`);
        }

        const accountId = accountResult.id;

        const contactResult = await conn.sobject('Contact').create({
            AccountId: accountId,
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Email: userData.email,
            Phone: userData.phone || additionalData.phone || '',
            Title: userData.position || additionalData.jobTitle || 'Developer',
            Description: additionalData.notes || '',
        });

        if (!contactResult.success) {
            throw new Error(`Contact creation failed: ${JSON.stringify(contactResult.errors)}`);
        }

        return {
            success: true,
            accountId: accountId,
            contactId: contactResult.id,
            accountUrl: `${conn.instanceUrl}/${accountId}`,
            contactUrl: `${conn.instanceUrl}/${contactResult.id}`,
            alreadyExists: false,
        };
    } catch (err) {
        console.error('Salesforce creation error:', err);
        throw err;
    }
};