
const mssql = require('mssql');
const axios = require('axios');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date();
const dayName = days[date.getDay()];
const query = `exec sp_msforeachdb N' use [?] IF OBJECT_ID (N''ScheduledForm'', N''U'') IS NOT NULL begin
        select cfs.CampaignForm_Id
        Into #temp 
        from Scheduling s 
        inner join ScheduleSchema ss on ss.Id = s.ScheduleSchema_Id
        left  join WeeklyRecorrency w on w.Id = 
            CASE WHEN ss.PeriodicityType_Id != 3 THEN ss.WeeklyOddWeeklyRecorrency_Id 
                 WHEN (SELECT DATEPART(WEEK, GETDATE())%2) = 0 THEN ss.WeeklyEvenWeeklyRecorrency_Id 
                 ELSE ss.WeeklyOddWeeklyRecorrency_Id END
        inner join CampaignFormScheduling cfs on cfs.Scheduling_Id = s.Id
        inner join CampanhaFormulario cf on cf.Id = cfs.CampaignForm_Id 
        inner join Campanha c on c.Id = cf.Campanha_id 
        inner join Formulario f on f.Id = cf.Formulario_id
        where 
        s.Active = 1
        and ss.Active = 1
        and w.${dayName} = 1
        and cfs.Active = 1
        and cf.Active = 1
        and c.Ativo = 1 
        and f.Ativo = 1
        and GETDATE() between s.BeginDate and s.EndDate
        
        IF (select SUM(CampaignForm_Id)
            from #temp t
            where t.CampaignForm_Id not in 
            (select CampaignForm_Id from ScheduledForm where NextOccurrence = CAST(GETDATE() AS DATE) and Active = 1)) > 0 
        BEGIN
            select t.*, DB_NAME() Data_Base
            from #temp t
            where t.CampaignForm_Id not in 
            (select CampaignForm_Id from ScheduledForm where NextOccurrence = CAST(GETDATE() AS DATE) and Active = 1)
        END
        END'`;

const schedulerForms = {
    name: 'Scheduler Form TradeForce Test',
    cron: '0 6 * * *',
    imageUrl: 'https://pbs.twimg.com/profile_images/671401267969806336/ZsMonZXr_400x400.png',
    check: (config) => {
        try {
            return new Promise(async (res, rej) => {
                const scheduledForms  = await getFormsFails(config);
                const scheduledForms121 = await getFormsFailsServer121(config);
                const errors = [];

                if (scheduledForms) {
                    scheduledForms.recordsets.map(async (recordSet) => {
                        recordSet.map(async (scheduledForm) => {
                            errors.push(scheduledForm);
                        });
                    })                    
                }

                if (scheduledForms121) {
                    scheduledForms121.recordsets.map(async (recordSet) => {
                        recordSet.map(async (scheduledForm) => {
                            errors.push(scheduledForm);
                        });
                    })                    
                }
                
                if (errors.length > 0) {
                    rej.message = await sendPredict(errors);
                    rej(rej);
                } else {
                    res();
                }                
            });
        } catch (err) {
            throw err;
        }
    }
}        

function createConnection(connection) {
    connection = connection.replace('mssql://','');
    const user = connection.split(':')[0];
    connection = connection.replace(user + ':', '');
    const pass = connection.split('@e')[0];
    connection = connection.replace(pass + '@','');
    const server = connection.split('/')[0];
    const dataBase = connection.split('/')[1];
    return new mssql.ConnectionPool({
        user: user,
        password: pass,
        database: dataBase,
        server: server,
        connectionTimeout: 300000,
        requestTimeout: 300000
    })
}

async function getFormsFails(config) {
    let result; 
    try {
        const mssqlConn = createConnection(config.MSSQL_CONNECTION_STRING);
        await mssqlConn.connect();
        result = await mssqlConn.request()
            .query(query);
    } catch (err) {
        throw err;
    } finally {
        mssql.close();
    }
    return result;
}

async function getFormsFailsServer121(config) {
    let result; 
    try {
        const mssqlConn = createConnection(config.MSSQL_CONNECTION_STRING_121);
        await mssqlConn.connect();
        result = await mssqlConn.request()
            .query(query);
    } catch (err) {
        throw err;
    } finally {
        mssql.close();
    }
    return result;
}

async function sendPredict(scheduledForms) {
    let result = ''; 
    try {
        const promises = scheduledForms.map(async (scheduledForm) => {
            let url = `http://${scheduledForm.Data_Base.replace("TradeForce.","")}.tradeforce.com/api/formulario/PredictTest?campaignFormId=${scheduledForm.CampaignForm_Id}`;
            await axios.get(url, {
                headers: { 'Authorization': 'UsuarioId 7' }
            });
            result += `CampaignFormId = ${scheduledForm.CampaignForm_Id}, instancia ${scheduledForm.Data_Base}.<br>`;
        });
        await Promise.all(promises);
        return result;
    } catch (err) {
        throw err;
    } 
}

module.exports = {
    schedulerForms,
}