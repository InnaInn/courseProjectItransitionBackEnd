import dotenv from 'dotenv';

dotenv.config();

const config = {
  uiUrl: process.env.UI_URL,
  server: {
    port: process.env.PORT,
    url: process.env.BE_URL,
    cookie: {
      secure: process.env.COOKIE_SECURE,
      sameSite: process.env.COOKIE_SAME_SITE
    }
  },
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  
  salesforce: {
    //clientId: process.env.SALESFORCE_CLIENT_ID,
    //clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
    username: process.env.SALESFORCE_USERNAME,
    password: process.env.SALESFORCE_PASSWORD,
    securityToken: process.env.SALESFORCE_SECURITY_TOKEN,
    //redirectUri: process.env.SALESFORCE_REDIRECT_URI || 'http://localhost:5000/api/salesforce/callback',
  }
};

export default config;