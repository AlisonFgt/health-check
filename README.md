# Health Check

This project monitors some services and infrastructures of our environment, notifying in case of any problems via Teams, Slack or email as configured.

## Used Tecnologies

   * Node

## Project Setup

Download .NET core: 
https://dotnet.microsoft.com/download/dotnet-core/2.2

Python Setup: https://www.python.org/downloads/

Installing Pip: https://github.com/pypa/pip

Installing tableau sdk: https://downloads.tableau.com/tssoftware/Tableau-SDK-Python-Win-64Bit-10-3-17.zip


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