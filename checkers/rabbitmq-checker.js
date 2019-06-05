const amqplib = require("amqplib/callback_api");

const rabbitmqChecker = {
    name: 'RabbitMQ Test',
    imageUrl: 'https://cdn.iconscout.com/icon/free/png-512/rabbitmq-282296.png',
    check: (config) => {
        return new Promise((res, rej) => {
            amqplib.connect(config.RABBITMQ_URL, (err, conn) => {
                if (err)
                    rej(err);
                else
                    res();
            });
        });
    }
}

module.exports = {
    rabbitmqChecker
};