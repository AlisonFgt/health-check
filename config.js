const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    INTERVAL: process.env.INTERVAL,
    MSSQL_CONNECTION_STRING: process.env.MSSQL_CONNECTION_STRING,
    WEBHOOK_URL_TEAMS: process.env.WEBHOOK_URL_TEAMS,
    REDIS_URL: process.env.REDIS_URL,
    MONGO_URL: process.env.MONGO_URL,
    RABBITMQ_URL: process.env.RABBITMQ_URL,
};