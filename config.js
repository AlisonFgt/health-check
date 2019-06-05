const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MSSQL_CONNECTION_STRING: process.env.MSSQL_CONNECTION_STRING,
    WEBHOOK_URL_TEAMS: process.env.WEBHOOK_URL_TEAMS,
    INTERVAL: process.env.INTERVAL,
    REDIS_URL: process.env.REDIS_URL,
};