const axios = require('axios');
const crypto = require('crypto-js');

function dec(key) { 
    return crypto.AES.decrypt(key, "V@m05 Pr@ C1m@!").toString(crypto.enc.Utf8); 
}

function enc(key) { 
    return crypto.AES.encrypt(key, "V@m05 Pr@ C1m@!").toString(); 
}

const tradeAuthService = {
    name: 'Tradeforce Auth Service Test',
    cron: '0 * * * *',
    imageUrl: 'https://pbs.twimg.com/profile_images/671401267969806336/ZsMonZXr_400x400.png',
    check: (config) => {
        try {
            return new Promise(async (res, rej) => {
                const instanceName = config.INSTANCE_TRADEFORCE;
                const tFSecretKey = enc(instanceName +':PORTAL');
                let authorization = 'basic ' + Buffer.from(config.USER_TRADEFORCE + ':' + config.PASSWORD_TRADEFORCE).toString('base64');
                axios.post(config.AUTH_SERVICE_URL, {}, { 
                        headers: {
                            'TF-Secret-Key': tFSecretKey, 
                            'Authorization': authorization 
                        }
                    }
                    ).then(function (response) {
                        res(response);
                    }).catch(function (err) {
                        rej(err);
                    });
                });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    tradeAuthService,
}