'use strict';

exports.requiresLogin = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.json({
        success: false,
        message: 'You are not logged in.'
    });
};

exports.isInAdminRole = function (req, res, next) {
    if (!req.user.isAdmin) {
        return res.json({
            success: false,
            message: 'You are not authorized.'
        });
    }
    next();
};

exports.user = {
    hasAuthorization: function (req, res, next) {
        if (req.user.isAdmin) next();
        else if (req.profile.id != req.user.id) {
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
        if (req.user.isAdmin) next();
        else if (req.user.id === req.subscription.user.id) {
            next();
        } else {
            return res.json({
                success: false,
                message: 'You are not authorized.'
            });
        }
    }
};

exports.messageThread = {
    hasAuthorization: function (req, res, next) {
        if (req.user.isAdmin) next();
        else if (req.user.id === req.messageThread.sendUser.id 
            || req.user.id === req.messageThread.receiveUser.id) {
            next();
        } else {
            return res.json({
                success: false,
                message: 'You are not authorized.'
            });
        }
    }
};

exports.article = {
    hasAuthorization: function (req, res, next) {
        if (req.user.isAdmin) next();
        else if (req.user.id === req.article.user.id) {
            next();
        } else {
            return res.json({
                success: false,
                message: 'You are not authorized.'
            });
        }
    }
};
