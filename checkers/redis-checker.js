const redis = require("redis");

const redisChecker = {
    name: 'Redis Test',
    imageUrl: 'https://blog.newrelic.com/wp-content/uploads/redis.png',
    check: (config) => {
        return new Promise((res, rej) => {
            client = redis.createClient(config.REDIS_URL);
            client.on("error", rej);
            client.on("connect", res);
        });
    }
}

module.exports = {
    redisChecker
};