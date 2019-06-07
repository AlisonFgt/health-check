const {
    mssqlChecker, 
    mssqlDataServiceChecker
} = require('./checkers/mssql-checker');
const { redisChecker } = require('./checkers/redis-checker');
const { mongoChecker } = require('./checkers/mongo-checker');
const { rabbitmqChecker } = require('./checkers/rabbitmq-checker');

const { teamLog } = require('./utils/team-log');

const config = require('./config');

// test's services
const checkers = [mssqlChecker, redisChecker, mongoChecker, rabbitmqChecker];

// test's TradeForce
const checkersTradeForce = [mssqlDataServiceChecker];

// join all test's
checkers.push(...checkersTradeForce);

async function loop() {
    const executions = checkers.map(checker => {
        return checker.check(config)
            .then(() => {
                console.log(new Date() + ' - ' + checker.name + ' success!');
            }) 
            .catch(err => {
                console.log(err);
                //teamLog(checker.name, err.message, checker.imageUrl, config.WEBHOOK_URL_TEAMS);
            })
    });

    await Promise.all(executions);
}

loop();
setInterval(loop, config.INTERVAL * 60 * 1000); 