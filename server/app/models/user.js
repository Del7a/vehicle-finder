const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' }
});

const validatePresenceOf = value => value && value.length;

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    }).get(function () {
        return this._password;
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
    * Authenticate - check if the passwords are the same
    * @param {String} plainText
    * @return {Boolean}
    * @api public
    */
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
    * Make salt
    * @return {String}
    * @api public 
    */
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
    * Encrypt password
    *
    * @param {String} password
    * @return {String}
    * @api public
    */
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

/**
 * Statics
 */

UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load: function (options, cb) {
        options.select = options.select || 'username';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

module.exports = mongoose.model('User', UserSchema);