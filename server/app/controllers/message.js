'use strict';

const mongoose = require('mongoose');
const only = require('only');

const Article = mongoose.model('Article');
const MessageThread = mongoose.model('MessageThread');
const assign = Object.assign;

exports.load = function (req, res, next, msgThreadId) {
    MessageThread.load(msgThreadId, function (err, messageThread) {
        if (err) return next(err);
        if (!messageThread) return next(new Error('Message thread not found'));

        req.messageThread = messageThread;
        next();
    });
};

exports.show = function (req, res) {
    res.json({ success: true, thread: req.messageThread });
};

exports.showAll = function (req, res) {
    MessageThread.list({ criteria: { 
        $or: [
            { sendUser: req.user },
            { receiveUser: req.user }
        ]
    }}, function (err, messageThreads) {
        if (err) return res.json({ success: false, msg: err.message });

        if (!messageThreads) {
            res.json({ success: false, msg: 'No message threads found' });
        } else {
            res.json({ success: true, threads: messageThreads });
        }
    });
};

exports.sendOfferMsgThread = function (req, res) {
    if (!req.body || !req.body.concernedOffer || !req.body.msg) {
        res.json({ success: false, msg: 'Please fill all needed fileds.' });
    } else {
        Article.load(req.body.concernedOffer, function (err, article) {
            if (err) return res.json({ success: false, msg: err });
            if (!article) 
                return res.json({ success: false, msg: 'Article not found' });

            var newMessageThread = new MessageThread({ sendUser: req.user, receiveUser: article.user });
            assign(newMessageThread, only(req.body, 'concernedOffer'));
            createNewMessageThread(req, res, newMessageThread);
        });
    }    
};

exports.sendMsgThread = function (req, res) {
    if (!req.body || !req.body.msg) {
        res.json({ success: false, msg: 'Please fill all needed fileds.' });
    } else {
        var newMessageThread = new MessageThread({ sendUser: req.user });
        assign(newMessageThread, only(req.body, 'receiveUser'));
        createNewMessageThread(req, res, newMessageThread);
    }
};

exports.sendMessage = function (req, res) {
    if (!req.body || !req.body.msg) {
        res.json({ success: false, msg: 'Please fill all needed fileds.' });
    } else {
        req.messageThread.addMessage(req.user, req.body.msg, function (err) {
            if (err) return res.json({ success: false, msg: err });
            res.json({ success: true, thread: msgThread._id, msg: 'Message sent!' });
        });
    }
};

exports.markThreadRead = function (req, res) {
    req.messageThread.markThreadRead(req.user._id, function (err) {
        if (err) return res.json({ success: false, msg: err.message });
        res.json({ success: true, msg: 'Message thread marked as seen' });
    });
};

function createNewMessageThread(req, res, msgThread) {
    msgThread.save(function (err) {
        if (err) return res.json({ success: false, msg: err.message });
        msgThread.addMessage(req.user, req.body.msg, function (err) {
            if (err) return res.json({ success: false, msg: err });
            res.json({ success: true, thread: msgThread._id, msg: 'Message sent!' });
        });
    });
}
