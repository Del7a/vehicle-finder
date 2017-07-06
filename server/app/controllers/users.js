'use strict';

const mongoose = require('mongoose');
const only = require('only');

const User = mongoose.model('User');

exports.load = function (req, res, next, userId) {
    User.load({ criteria: { _id: userId } }, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('User not found'));

        req.selectedUser = user;
        next();
    });
};

exports.showAll = function (req, res) {
    User.list({}, function (err, users) {
        if (err) return res.json({ success: false, msg: err.message });
        if (!users) return res.json({ success: false, msg: 'No usrs found' });
        res.json({ success: true, users: users });
    });
};

exports.show = function (req, res) {
    res.json({ success: true, user: req.selectedUser });
};

exports.update = function (req, res) {
    if (!req.selectedUser) 
        return res.json({ success: false, msg: 'User not found.' });

    if (req.selectedUser.isAdmin)
        return res.json({ success: false, msg: "Cannot edit, user is admin." });
    
    assign(req.selectedUser, only(req.body, 'email firstName lastName'));
    req.selectedUser.save(function (err) {
        if (err) return res.json({ success: false, msg: err.message }); 
        res.json({ success: true, msg: 'User edited' });
    });
};

exports.destroy = function (req, res) {
    if (req.selectedUser.isAdmin)
        return res.json({ success: false, msg: "Cannot delete, user is admin." });

    User.remove({ _id: req.selectedUser._id }, function (err) {
        if (err) return res.json({ success: false, msg: 'User not found.' });
        res.json({ success: true, msg: 'User deleted' });
    });
};
