const mssql = require('mssql');

const mssqlChecker = {
    name: 'SQL Server Test',
    imageUrl: 'http://nsi.com.br/wp/wp-content/uploads/2017/04/curso_sql_server-275x231.png',
    check: async (config) => {
        try {
            const mssqlConn = new mssql.ConnectionPool(config.MSSQL_CONNECTION_STRING);
            await mssqlConn.connect();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    mssqlChecker,
};