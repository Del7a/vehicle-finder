'use strict';

exports.requiresLogin = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.json({
        success: false,
        message: 'You are not logged in.'
    });
};

exports.user = {
    hasAuthorization: function (req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.json({
                success: false,
                message: 'You are not authorized.'
            });
        }
        next();
    }
};

exports.subscription = {
    hasAuthorization: function (req, res, next) {
        if (req.user.id === req.subscription.user.id) {
            next();
        } else {
            return res.json({
                success: false,
                message: 'You are not authorized.'
            });
        }
    }
};
