// js-data setup
const jsData = require('js-data');
const DSMongoDBAdapter = require('js-data-mongodb');

const adapter = new DSMongoDBAdapter('mongodb://localhost:27017');

const DS = new jsData.DS({
    cacheResponse: false
});

DS.registerAdapter('mongo', adapter, { default: true });

const user = require('./models/user');
const schemator = require("./services/schemator");

module.exports = (app) => {
	app.locals.DS = DS;
    app.locals.schemator = schemator;
    app.locals.User = user(DS, schemator);
};