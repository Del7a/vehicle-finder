'use strict';

const mongoose = require('mongoose');
const only = require('only');

const Article = mongoose.model('Article');
const assign = Object.assign;

exports.load = function (req, res, next, artId) {
    Article.load(artId, function (err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Offer not found'));

        req.article = article;
        next();
    });
};

exports.showAll = function (req, res) {
    Article.list({}, function (err, articles) {
        if (err)
            return res.json({ success: false, msg: err.message });

        if (!articles) {
            res.json({ success: false, msg: 'No makers found' });
        } else {
            res.json({ success: true, articles: articles });
        }
    });
};

exports.create = function (req, res) {
    if (!req.body) {
        res.json({ success: false, msg: 'Please fill all needed fileds.' });
    } else {
        var newArticle = new Article({ user: req.user });
        assign(newArticle,
            only(req.body, 'title body year maker model imageUrl tags'));
        newArticle.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: err.message });
            }
            res.json({ success: true, msg: 'Offer created' });
        });
    }
};

exports.update = function (req, res) {
    Article.load(req.article._id, function (err, article) {
        if (!article) {
            res.json({ success: false, msg: 'Offer not found' });
        } else {
            assign(article,
                only(req.body, 'title body year maker model imageUrl tags'));
            article.save(function (err) {
                if (err) return res.json({ success: false, msg: err.message });
                res.json({ success: true, msg: 'Offer edited' });
            });
        }
    });
};

exports.show = function (req, res) {
    res.json({ success: true, article: req.article });
}

exports.destroy = function (req, res) {
    Article.remove({ _id: req.article._id }, function (err) {
        if (err) return res.json({ success: false, msg: 'Article not found.' });
        res.json({ success: true, msg: 'Article deleted' });
    });
};
