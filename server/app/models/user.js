'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, default: '', trim: true },
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    username: { type: String, default: '', trim: true },
    isAdmin: { type: Boolean, default: false },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    notifications: [{
        subscription: { type: Schema.ObjectId, ref: 'Subscription' },
        article: { type: Schema.ObjectId, ref: 'Article' },
        isSeen: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }]
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

UserSchema.path('username').validate(function (username, fn) {
    const User = mongoose.model('User');
    
    if (this.isNew || this.isModified('username')) {
        User.find({ username: username }).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Username already exists');

UserSchema.path('email').validate(function (email, fn) {
    const User = mongoose.model('User');
    
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Email already exists');

UserSchema.pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else next();
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
     * Add new notification
     * 
     * @param {ObjectId} subId
     * @param {ObjectId} articleId
     * @api private
     */
    addNotification: function (subId, articleId) {
        this.notifications.push({
            subscription: subId,
            article: articleId    
        });

        return this.save();
    },

    /**
     * Mark notification as seen
     * 
     * @param {ObjectId} notificationId
     * @api private
     */
    markNotificationSeen: function (notificationId) {
        const index = this.notifications
            .map(notif => notif.id)
            .indexOf(notificationId);

        if (~index) this.notifications[index].isSeen = true;
        else throw new Error('Notification not found');
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
        const criteria = options.criteria || {};
        const select = options.select || 
            'email firstName lastName username subscriptions isAdmin';
        return this.findOne(criteria)
            .select(select)
            .exec(cb);
    },

    /**
     * List users
     * 
     * @param {Object} options
     * @param {Function} cb
     */
    list: function (options, cb) {
        const criteria = options.criteria || {};
        const select = options.select || 
            'email firstName lastName username subscriptions isAdmin';
        return this.find(criteria)
            .select(select)
            .exec(cb);
    }
};

module.exports = mongoose.model('User', UserSchema);
