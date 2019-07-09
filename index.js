const fs = require('fs');
const cron = require('node-cron');

const config = require('./config');
const { redisChecker } = require('./checkers/redis-checker');
const { mongoChecker } = require('./checkers/mongo-checker');
const { rabbitmqChecker } = require('./checkers/rabbitmq-checker');
const { tradeAuthService } = require('./checkers/tradeforce-services-checker');
const { schedulerForms } = require('./checkers/scheduler-forms-checker');
const { teamLog } = require('./utils/team-log');
const {
    mssqlChecker, 
    mssqlDataServiceChecker
} = require('./checkers/mssql-checker');

// test's services
const checkers = [mssqlChecker, redisChecker, mongoChecker, rabbitmqChecker];

// test's TradeForce
const checkersTradeForce = [mssqlDataServiceChecker, tradeAuthService, schedulerForms];

// join all test's
if (!config.DEV_MODE)
    checkers.push(...checkersTradeForce);

function saveLog(text) {
    fs.appendFile("log.txt", "\n" + text, (err) => {
        if (err) console.log(err);
      });
}

function main() {
    checkers.map(checker => {
        cron.schedule(checker.cron, () => {
            checker.check(config)
                .then(() => {
                    let msg = new Date() + ' - ' + checker.name + ' success!';
                    console.log(msg);
                    saveLog(msg);
                }) 
                .catch(err => {
                    console.log(err.message);
                    saveLog(err.message);
                    teamLog(checker.name, err.message, checker.imageUrl, config.WEBHOOK_URL_TEAMS);
                });
        });
    });
}

main();