const mongoose = require('mongoose');
const only = require('only');

const User = mongoose.model('User');
const assign = Object.assign;

exports.getProfile = function (req, res) {
    if (!req.user)
        return res.json({ success: false, msg: 'User not found.' });

    res.json({ success: true, user: req.user });
};

exports.saveProfile = function (req, res) {
    if (!req.user)
        return res.json({ success: false, msg: 'User not found.' });

    assign(req.user, only(req.body, 'email firstName lastName'));
    req.user.save(function (err) {
        if (err) return res.json({ success: false, msg: err.message }); 
        res.json({ success: true, msg: 'Profile edited' });
    });
};

exports.getSubscriptions = function (req, res) {
    if (!req.user)
        return res.json({ success: false, msg: 'User not found.' });
    
    res.json({ success: true, subscriptions: req.user.subscriptions });
}
