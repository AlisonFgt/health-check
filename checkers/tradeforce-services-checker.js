const { 
    getOneInstanceNameActive,
    getOneUserTradeForce
 } = require('./checkers/mssql-checker');
const axios = require('axios');
const crypto = require('crypto-js');

function dec(key) { 
    return crypto.AES.decrypt(key, "V@m05 Pr@ C1m@!").toString(crypto.enc.Utf8); 
}

function enc(key) { 
    return crypto.AES.encrypt(key, "V@m05 Pr@ C1m@!").toString(); 
}

function testAuthService(config){
    const instanceName = await getOneInstanceNameActive(config);
    const TFSecretKey = enc(instanceName +':PORTAL');
    const user = await getOneUserTradeForce(config);
    const Authorization = 'basic ' + 'encondebase64';
    axios.post(webHookUrl, {
            themeColor: "F00",
            summary: error,
            sections: [{
                activityTitle: "Failure " + name,
                activitySubtitle: error,
                activityImage: imageUrl,
                markdown: true
            }]
        }
    )
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
        throw err
    });
}

module.exports = {
    testAuthService,
}