'use strict';

const mongoose = require('mongoose');
const only = require('only');

const Article = mongoose.model('Article');
const assign = Object.assign;

exports.load = function (req, res, next, id) {
    Article.load(id, function (err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Offer not found'));

        req.article = article;
        next();
    });
};

exports.destroy = function (req, res) {
    Article.remove({ _id: req.article._id }, function (err) {
        if (err) return res.json({ success: false, msg: 'Article not found.' });
        res.json({ success: true, msg: 'Article deleted' });
    });
};
