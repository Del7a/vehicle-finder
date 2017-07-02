module.exports = (DS, schemator) => {
    schemator.defineSchema('User', {
            id: 'id',
            username: 'string',
            email: 'string',
            password: 'string'
        }
    );

    return DS.defineResource('user');
};