'use strict';

const mongoose = require('mongoose');
const only = require('only');

const Subscription = mongoose.model('Subscription');
const assign = Object.assign;

exports.load = function (req, res, next, subId) {
    Subscription.load(subId, function (err, subscription) {
        if (err) return next(err);
        if (!subscription) return next(new Error('SUbscription not found'));

        req.subscription = subscription;
        next();
    });
};

exports.show = function (req, res) {
    res.json({ success: true, subscription: req.subscription });
};

exports.showAll = function (req, res) {
    Subscription.list({ 
        criteria: { user: req.user }
    }, function (err, subscriptions) {
        if (err) return res.json({ success: false, msg: err.message });

        if (!subscriptions) {
            res.json({ success: false, msg: 'No subscriptions found' });
        } else {
            res.json({ success: true, subscriptions: subscriptions});
        }
    });
};

exports.create = function (req, res) {
    if (!req.body) {
        res.json({ success: false, msg: 'Please fill all needed fields.' });
    } else {
        var newSub = new Subscription({ user: req.user });
        assign(newSub,
            only(req.body, 'title yearFrom yearTo priceFrom priceTo maker model'));
        newSub.save(function (err) {
            if (err) return res.json({ success: false, msg: err.message });

            res.json({ success: true, msg: 'Subscription created', id: newSub._id });
        });
    }
};

exports.destroy = function (req, res) {
    Subscription.remove({ _id: req.subscription._id }, function (err) {
        if (err) return res.json({ success: false, msg: 'Subscription not found.' });
        res.json({ success: true, msg: 'Subscription deleted'});
    });
};
