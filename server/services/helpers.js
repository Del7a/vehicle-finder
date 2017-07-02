const _ = require('lodash');

module.exports = class Helpers {
    static applyProjectionOnCollection(collection, projection) {
        const keysToGet = _.keys(projection);

        return collection.map(entity => {
            return _.pick(entity, keysToGet);
        });
    }

    static applyProjectionOnEntity(entity, projection) {
        const keysToGet = _.keys(projection);

        return _.pick(entity, keysToGet);
    }
};