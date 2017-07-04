const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const only = require('only');
const auth = require('../../config/middlewares/authorization');

const User = mongoose.model('User');
const router = express.Router();
const assign = Object.assign;

router.post('/register', function (req, res) {
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
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
});

router.post('/login', passport.authenticate('local'), function (req, res) {
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
});

router.post('/logout', auth.requiresLogin, function (req, res) {
    req.logout();
    res.json({ success: true });
});

router.post('/passwd', auth.requiresLogin, function (req, res) {
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
            try {
                user.save();
                res.json({ success: true });
            } catch (err) {
                res.json({ success: false, msg: err });
            }
        }
    });
});

router.get('/profile', auth.requiresLogin, function (req, res) {
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
});

router.post('/profile', auth.requiresLogin, function (req, res) {
    User.load({
        username: req.user.username
    }, function (err, user) {
        if (!user) {
            res.json({ success: false, msg: 'User not found.' });
        } else {
            assign(user, only(req.body, 'email firstName lastName'));
            
            try {
                user.save();
                res.json({ success: true });
            } catch (err) {
                res.json({ success: false, msg: err });
            }
        }
    });
});

module.exports = router;
