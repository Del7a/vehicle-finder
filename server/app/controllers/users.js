const mongoose = require('mongoose');
const only = require('only');

const User = mongoose.model('User');
const assign = Object.assign;

exports.register = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass name and password.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: err.message });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
};

exports.login = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            if (user.authenticate(req.body.password)) {
                res.json({ success: true });
            } else {
                res.json({ success: false, msg: 'Wrong username of password.' });
            }
        }
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.json({ success: true });
};

exports.changePassword = function (req, res) {
    if (!req.body.oldPassword || !req.body.password ||
        (req.body.password !== req.body.passwordRepeat)) {
        return res.json({ success: false, msg: 'Please fill all fields properly.' });
    }

    User.findOne({ username: req.user.username }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, msg: 'User not found.' });
        } else {
            if (!user.authenticate(req.body.oldPassword))
                return res.json({ success: false, msg: 'Wrong password.' });

            assign(user, only(req.body, 'password'));
            user.save(function (err) {
                if (err) {
                    return res.json({ success: false, msg: err.message });
                }
                res.json({ success: true, msg: 'Password changed' });
            });
        }
    });
};

exports.getProfile = function (req, res) {
    User.load({
        username: req.user.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, msg: 'User not found.' });
        } else {
            res.json({ success: true, user: user });
        }
    });
};

exports.saveProfile = function (req, res) {
    User.load({
        username: req.user.username
    }, function (err, user) {
        if (!user) {
            res.json({ success: false, msg: 'User not found.' });
        } else {
            assign(user, only(req.body, 'email firstName lastName'));
            user.save(function (err) {
                if (err) {
                    return res.json({ success: false, msg: err.message });
                }
                res.json({ success: true, msg: 'Profile edited' });
            });
        }
    });
};
