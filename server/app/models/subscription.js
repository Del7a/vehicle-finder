'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    title: { type: String, default: '', trim: true },
    yearFrom: { type: Number, default: 0 },
    yearTo: { type: Number, default: 0 },
    priceFrom: { type: Number, default: 0 },
    priceTo: { type: Number, default: 0 },
    maker: { type: Schema.ObjectId, ref: 'Maker'},
    model: { type: Schema.ObjectId, ref: 'Maker.models'},
    user: { type: Schema.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

SubscriptionSchema.path('title').required(true, 'A subscription must have a title');
SubscriptionSchema.path('maker').validate(function (makerId, fn) {
    const Maker = mongoose.model('Maker');
    Maker.findOne({ _id: makerId }, function (err, maker) {
        if (err || !maker) fn(false);
        else fn(true);
    });
}, 'Maker does not exist');

/**
 * Statics
 */
SubscriptionSchema.statics = {
    /**
     * Find offer by id
     * 
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */
    load: function (_id, cb) {
        return this.findOne({ _id })
            .select('title yearFrom yearTo priceFrom priceTo maker model user createdAt')
            .populate('maker', 'name models')
            .populate('user', 'username email')
            .exec(cb);
    },

    /**
     * List all offers
     * 
     * @param {ObjectId} options
     * @param {Function} cb
     * @api private
     */
    list: function (options, cb) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .select('title yearFrom yearTo priceFrom priceTo maker model createdAt')
            .populate('maker', 'name models')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec(cb);
    },
};

module.exports = mongoose.model('Subscription', SubscriptionSchema);
