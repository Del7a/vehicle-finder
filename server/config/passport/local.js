'use strict';

/**
 * Dependencies
 */
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/**
 * Expose
 */
module.exports = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, passport, done) {
        const options = {
            criteria: { username: username },
            select: 'username email hashed_password salt'
        };

        User.load(options, function (err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { message: 'User not found!' });
            }
            
            if (!user.authenticate(passport)) {
                return done(null, false, { message: 'Invalid password!' });
            }

            return done(null, user);
        });
    }
);