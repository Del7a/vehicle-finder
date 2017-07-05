'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.load = function (req, res, next, userId) {
    User.load({ criteria: { _id: userId } }, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('User not found'));

        req.selectedUser = user;
        next();
    });
};

exports.show = function (req, res) {
    res.json({ success: true, user: req.selectedUser });
};

exports.destroy = function (req, res) {
    if (req.selectedUser.isAdmin)
        return res.json({ success: false, msg: "Cannot delete, user is admin." });

    User.remove({ _id: req.selectedUser._id }, function (err) {
        if (err) return res.json({ success: false, msg: 'User not found.' });
        res.json({ success: true, msg: 'User deleted' });
    });
};
