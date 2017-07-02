const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    authToken: { type: String, default: '' },
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
 * Validations
 **/
UserSchema.path('username').validate(function (name) {
    if (this.skipValidation()) 
        return true;
    
    return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    if (this.skipValidation()) 
        return true;
    
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
    const User = mongoose.model('User');
    if (this.skipValidation()) fn(true);

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({ email: email }).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Email already exists');

UserSchema.path('username').validate(function (username) {
    if (this.skipValidation()) return true;
    return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    if (this.skipValidation()) return true;
    return hashed_password.length && this._password.length;
}, 'Password cannot be blank');

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

mongoose.model('User', UserSchema);