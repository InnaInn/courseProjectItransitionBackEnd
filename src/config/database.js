import knex from 'knex';
import config from './config.js';

const databaseConfig = {
  client: 'postgresql',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    port: config.database.port
  }
};

const db = knex(databaseConfig);

export default db;
