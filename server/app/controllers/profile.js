const mongoose = require('mongoose');
const only = require('only');

const User = mongoose.model('User');
const assign = Object.assign;

exports.getProfile = function (req, res) {
    User.load({ criteria: { 
        username: req.user.username 
    }}, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, msg: 'User not found.' });
        } else {
            res.json({ success: true, user: user });
        }
    });
};

exports.saveProfile = function (req, res) {
    User.load({ criteria: { 
        username: req.user.username 
    }}, function (err, user) {
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

exports.getSubscriptions = function (req, res) {
    User.load({ criteria: {
        username: req.user.username
    }}, function(err, user) {
        if (!user) {
            res.json({ success: false, msg: 'User not found.' });
        } else {
            res.json({ success: true, subscriptions: user.subscriptions });
        }
    });
}
