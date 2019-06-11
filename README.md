# Health Check

<img src="health_check.png" width="120">

This project monitors some services and infrastructures of our environment, notifying in case of any problems via Teams, Slack or email as configured.

## Used Tecnologies

   * Node

## Project Setup

Installing Npm: https://www.npmjs.com/get-npm

Health Check Setup: 
   * Clone project
   * In folder the project run command npm install
   * Configuration the .env file to run local
   * Run local, execute command Node index.js
   * Or configuration the docker-compose.yml to run in Server Docker
   * Run Docker, docker-compose -d up --build

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
AUTH_SERVICE_URL=http://52.67.172.53:3000/tokens
USER_TRADEFORCE=******
PASSWORD_TRADEFORCE=*******
INSTANCE_TRADEFORCE=COMERCIAL
DEV_MODE=TRUE
```

configuration in docker-compose.yml file.

```
version: "3.2"

services:
  health-checker:
    build: .
    environment:
      MSSQL_CONNECTION_STRING: "mssql://user:password@host/dbname"
      WEBHOOK_URL_TEAMS: "https://outlook.office.com/webhook/...."
      INTERVAL: 60 # minutes
      REDIS_URL: "redis://url:port"
      MONGO_URL: "mongodb://user:password@host:port/dbname"
      RABBITMQ_URL: "amqp://user:password@host/queue"
      AUTH_SERVICE_URL: "http://www.seu-microservico.com.br/tokens"
      USER_TRADEFORCE: "admin"
      PASSWORD_TRADEFORCE: "*****"
      INSTANCE_TRADEFORCE: "COMERCIAL"
      DEV_MODE: "TRUE"
```

## Monitoring services

   * SQL Server
   * Redis
   * MongoDB
   * RabbitMQ

## Monitoring TradeForce Services

   * TradeForce Auth Service

## View history executions
   * log.txt in folter the project 