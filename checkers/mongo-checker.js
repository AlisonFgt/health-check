const mongoose = require("mongoose");

const mongoChecker = {
    name: 'Mongo Test',
    imageUrl: 'http://www.decom.ufop.br/imobilis/wp-content/uploads/2014/04/mongodb-logo.png',
    check: (config) => {
        return new Promise((res, rej) => {
            mongoose.connect(config.MONGO_URL, { useNewUrlParser: true }, function(err) {
                if (err) return rej(err);
                res();
            });
        });
    }
}

module.exports = {
    mongoChecker
};