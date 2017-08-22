'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageThreadSchema = new Schema({
    sendUser: { type: Schema.ObjectId, ref: 'User' },
    receiveUser: { type: Schema.ObjectId, ref: 'User' },
    concernedOffer: { type: Scheme.ObjectId, ref: 'Article' },
    messages: [{ 
        from: { type: Schema.ObjectId, ref: 'User'},
        body: { type: String, default: '', trim: true },
        createdAt: { type: Date, default: Date.now }
    }],
    senderLastSeen: { type: Date },
    receiverLastSeen: { type: Date },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

MessageThreadSchema.path('receiveUser').validate(function (userId, fn) {
    const User = mongoose.model('User');
    User.findOne({ _id: userId }, function (err, user) {
        if (err || !user) fn(false);
        else fn(true);
    });
}, 'Receiving user does not exist');

/**
 * Methods
 */
MessageThreadSchema.methods = {
    /**
     * Add new message to the thread
     * 
     * @param {ObjectId} senderId
     * @param {String} msg
     * @param {Function} cb
     * @api private
     */
    addMessage: function (senderId, msg, cb) {
        this.messages.push({
            from: senderId,
            body: msg
        });

        if (senderId == this.sendUser.id)
            this.senderLastSeen(Date.now());
        else 
            this.receiverLastSeen(Date.now());

        this.updatedAt(Date.now());

        return this.save(function (err) {
            return cb(err);
        });
    },

    /**
     * Mark the thread as seen by user
     * 
     * @param {ObjectId} userId
     * @param {Function} cb
     * @api private
     */
    markSeen: function (userId, cb) {
        if (senderId == this.sendUser.id)
            this.senderLastSeen(Date.now());
        else 
            this.receiverLastSeen(Date.now());

        return this.save(function (err) {
            return cb(err);
        });
    },
};

/**
 * Statics
 */
MessageThreadSchema.statics = {
    /**
     * Load a message thread with all of its messages
     * 
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */
    load: function (_id, cb) {
        return this.findOne({ _id })
            .select('sendUser receiveUser concernedOffer messages senderLastSeen receiverLastSeen updatedAt createdAt')
            .populate('sendUser', 'email firstName lastName')
            .populate('receiveUser', 'email firstName, lastName')
            .populate('concernedOffer', 'title')
            .exec(cb);
    },

    /**
     * List all message threads
     * 
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    list: function (options, cb) {
        const criteria = options.criteria || {};
        return this.find(criteria)
            .select('sendUser receiveUser concernedOffer senderLastSeen receiverLastSeen updatedAt createdAt')
            .populate('sendUser', 'email firstName lastName')
            .populate('receiveUser', 'email firstName, lastName')
            .populate('concernedOffer', 'title')
            .sort({ updatedAt: -1 })
            .exec(cb);
    }
};

module.exports = mongoose.model('MessageThread', MessageThreadSchema);
