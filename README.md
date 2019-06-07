# Health Check

<img src="health_check.png" width="120">

This project monitors some services and infrastructures of our environment, notifying in case of any problems via Teams, Slack or email as configured.

## Used Tecnologies

   * Node

## Project Setup

Installing Npm: https://www.npmjs.com/get-npm

Health Check Setup: 
   * In folder the project run command npm install --save
   * Configuration the .env file to run local
   * Configuration the docker-compose.yml to run in Server Docker
   * Run local, execute command Node index.js
   * Run Docker, docker-compose up --build

## Creating configuration

The services or routines that are to be monitored need an environment configuration for the connections, as shown in the following example:

configuration in .env file.

```
MSSQL_CONNECTION_STRING=mssql://username:password@host/dbname
WEBHOOK_URL_TEAMS=url_web_hook
INTERVAL=60 -- in minutes
REDIS_URL=redis://prdredis.sistem.com:6379
MONGO_URL=mongodb://admin:pwd@host:port/dbName
RABBITMQ_URL=amqp://rabbitmq:pwd@queue.sistem.com.br/queue
```

## Monitored services

   * SQL Server
   * Redis
   * MongoDB
   * RabbitMQ