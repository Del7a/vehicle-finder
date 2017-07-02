const JSDataSchema = require('js-data-schema');

const schemator = new JSDataSchema();

schemator.defineDataType('id', x => {
    // allow own id not to be defined
    // should end up here only on
    // entity create
    const type = typeof x;

    if (type === 'undefined') {
        return null;
    }

    if (type === 'string') {
        return null;
    }

    return {
        rule: 'type',
        actual: type,
        expected: 'string'
    };

});


module.exports = schemator;
