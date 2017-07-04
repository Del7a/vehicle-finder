'use strict';

const mongoose = require('mongoose');

const Maker = mongoose.model('Maker');
const assign = Object.assign;

exports.load = function (req, res, next, id) {
    Maker.load(id, function (err, maker) {
        if (err) return next(err);
        if (!maker) return next(new Error('Maker not found'));

        req.maker = maker;
        next();
    });
};

exports.showAll = function (req, res) {
    Maker.find({}).select('name models')
        .exec(function (err, makers) {
            if (err) throw err;

            if (!makers) {
                res.json({
                    success: false,
                    msg: 'No makers found'
                });
            } else {
                res.json({ success: true, makers: makers });
            }
        });
};

exports.create = function (req, res) {
    if (!req.body.name) {
        res.json({ success: false, msg: 'Maker name required' });
    } else {
        var newMaker = new Maker({
            name: req.body.name
        });

        newMaker.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: err.message });
            }
            res.json({ success: true, msg: 'Maker created' });
        });
    }
};

exports.show = function (req, res) {
    res.json({ success: true, maker: req.maker });
};

exports.update = function (req, res) {
    Maker.load(req.maker._id, function (err, maker) {
        if (!maker) {
            res.json({ success: false, msg: 'Maker not found.' });
        } else {
            maker.name = req.body.name;
            maker.save(function (err) {
                if (err) {
                    return res.json({ success: false, msg: err.message });
                }
                res.json({ success: true, msg: 'Maker edited' });
            });
        }
    });
};

exports.destroy = function (req, res) {
    Maker.remove({ _id: req.maker._id }, function (err) {
        if (err) return res.json({ success: false, msg: 'Maker not found.' });
        res.json({ success: true, msg: 'Maker deleted' });
    });
};
