const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, default: '', trim: true },
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    username: { type: String, default: '', trim: true },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    subscriptions: [{
        refId: { type: Number, default: 0 },
        name: { type: String, default: '', trim: true }
    }]
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    }).get(function () {
        return this._password;
    });

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
    },

    /**
     * Add subscription
     * 
     * @param {Number} refId
     * @param {String} name
     * @api private
     */
    addSubsciption: function (refId, name) {
        this.subscriptions.push({
            refId: refId,
            name: name
        });

        return this.save();
    },

    /**
     * Remove subscription
     * 
     * @param {subscriptionId} subId
     * @api private
     */
    removeSubscription: function (subId) {
        const index = this.subscriptions
            .map(sub => sub.id)
            .indexOf(subId);

        if (~index) this.comments.splice(index, 1);
        else throw new Error('Subscription not found');
        return this.save();
    }
};

UserSchema.statics = {
    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load: function (options, cb) {
        options.select = options.select || 
            'email firstName lastName username subscriptions';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

module.exports = mongoose.model('User', UserSchema);