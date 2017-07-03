const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

const router = express.Router();

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
            res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            if (user.authenticate(req.body.password)) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    });
});

module.exports = router;
