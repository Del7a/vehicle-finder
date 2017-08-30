const mongoose = require('mongoose');
const only = require('only');

const User = mongoose.model('User');
const assign = Object.assign;

exports.register = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass name and password.' });
    } else {
        var newUser = new User();
        assign(newUser, only(req.body, 'username password email'));
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
                success: false, msg: 'Wrong username of password.' });
        } else {
            if (user.authenticate(req.body.password)) {
                res.json({ success: true, isAdmin: user.isAdmin });
            } else {
                res.json({ success: false, msg: 'Wrong username of password' });
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
