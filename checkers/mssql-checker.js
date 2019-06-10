const mssql = require('mssql');

const _imageUrl = 'http://nsi.com.br/wp/wp-content/uploads/2017/04/curso_sql_server-275x231.png';

const mssqlChecker = {
    name: 'SQL Server Test',
    imageUrl: _imageUrl,
    check: async (config) => {
        try {
            const mssqlConn = new mssql.ConnectionPool(config.MSSQL_CONNECTION_STRING);
            await mssqlConn.connect();
            mssql.close();
        } catch (err) {
            throw err;
        }
    }
}

// Test TradeForce Data Service
const mssqlDataServiceChecker = {
    name : 'Data Services Accounts Test',
    imageUrl: _imageUrl,
    check: async (config) => {
        try {
            let result = await getInstances(config);
            await Promise.all(result.recordset.map(async (instance) => {
                const conn = createdConnection(instance);
                try {
                    await conn.connect();
                } catch (err) {
                    throw new Error(instance.DatabaseName + ': ' + err.message);
                } finally {
                    conn.close();
                }                                        
            }));                           
        } catch (err) {
            throw err;
        }
    }
}

function createdConnection(instance) {
    return new mssql.ConnectionPool({
        user: instance.Username,
        password: instance.Password,
        server: instance.Server,
        database: instance.DatabaseName
    });
}

async function getInstances(config) {
    const mssqlConn = new mssql.ConnectionPool(config.MSSQL_CONNECTION_STRING);
    await mssqlConn.connect();
    return await mssqlConn.request()
        .query(`SELECT 
                    * 
                FROM 
                    Instance
                WHERE
                    Active = 1
                    AND Production = 1`);
}

async function getOneInstanceNameActive(config) {
    const mssqlConn = new mssql.ConnectionPool(config.MSSQL_CONNECTION_STRING);
    await mssqlConn.connect();
    const instancia = await mssqlConn.request()
        .query(`SELECT TOP 1
                    Name 
                FROM 
                    Instance
                WHERE
                    Active = 1
                    AND Production = 1`);
    return instancia.recordset[0].Name;
}

async function getOneUserTradeForce(config) {
    instances = await getInstances(config);
    const instance = instances.recordset[0];
    const conn = createdConnection(instance);
    try {
        await conn.connect();
        const user = await conn.request()
            .query(`SELECT * FROM usuario WHERE login = 'system'`);
        return user.recordset[0];
    } catch (err) {
        throw new Error(instance.DatabaseName + ': ' + err.message);
    } finally {
        conn.close();
    }  
}

module.exports = {
    mssqlChecker,
    mssqlDataServiceChecker,
    getInstances,
    getOneUserTradeForce,
    getOneInstanceNameActive
};