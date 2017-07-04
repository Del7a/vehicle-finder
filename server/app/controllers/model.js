'use strict';

const mongoose = require('mongoose');

exports.load = function (req, res, next, id) {
    req.model = req.maker.models
        .find(model => model.id === id);

    if (!req.model) return next(new Error('Model not found'));
    next();
};

exports.get = function (req, res) {
    res.json({ success: true, model: req.model });
};

exports.create = function (req, res) {
    req.maker.addModel(req.body.name, function (err) {
        if (err) return res.json({ success: false, msg: err });
        res.json({ success: true, msg: 'Model added' });
    });
};

exports.destroy = function (req, res) {
    req.maker.removeModel(req.params.modelId, function (err) {
        if (err) return res.json({ success: false, msg: err });
        res.json({ success: true, msg: 'Model removed' });
    });
};
