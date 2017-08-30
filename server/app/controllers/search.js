'use strict';

const mongoose = require('mongoose');

const Article = mongoose.model('Article');

exports.searchByName = function (req, res) {
    if (!req.body.query)
        return res.json({ success: false, msg: 'Please provide seach query' });
    Article.list({ criteria: {
        title: new RegExp(req.body.query, "ig") 
    }}, function (err, articles) {
        if (err)
            return res.json({ success: false, msg: err.message });

        if (!articles) {
            res.json({ success: false, msg: 'No articles found' });
        } else {
            res.json({ success: true, articles: articles });
        }
    });
};
