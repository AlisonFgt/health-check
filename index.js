const {
    mssqlChecker, 
    mssqlDataServiceChecker
} = require('./checkers/mssql-checker');
const { redisChecker } = require('./checkers/redis-checker');
const { mongoChecker } = require('./checkers/mongo-checker');
const { rabbitmqChecker } = require('./checkers/rabbitmq-checker');
const { tradeAuthService } = require('./checkers/tradeforce-services-checker');



const { teamLog } = require('./utils/team-log');
const fs = require('fs');
const config = require('./config');

// test's services
const checkers = [mssqlChecker, redisChecker, mongoChecker, rabbitmqChecker];

// test's TradeForce
const checkersTradeForce = [mssqlDataServiceChecker, tradeAuthService];

// join all test's
if (!config.DEV_MODE)
    checkers.push(...checkersTradeForce);

function saveLog(text) {
    fs.appendFile("log.txt", "\n" + text, (err) => {
        if (err) console.log(err);
      });
}

async function loop() {
    const executions = checkers.map(checker => {
        return checker.check(config)
            .then(() => {
                let msg = new Date() + ' - ' + checker.name + ' success!';
                console.log(msg);
                saveLog(msg);
            }) 
            .catch(err => {
                console.log(err);
                saveLog(err);
                teamLog(checker.name, err.message, checker.imageUrl, config.WEBHOOK_URL_TEAMS);
            })
    });

    await Promise.all(executions);
}

loop();
setInterval(loop, config.INTERVAL * 60 * 1000); 