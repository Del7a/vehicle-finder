'use strict';

const dbName = process.env.MONGO_DB_NAME || 'autobot';

const mongoAddress = process.env.MONGO_URL + ':' +
    process.env.MONGO_PORT + '/' + dbName;

module.exports = {
    db: mongoAddress
};