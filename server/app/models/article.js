'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

const ArticleSchema = new Schema({
    title: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    year: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    maker: { type: Schema.ObjectId, ref: 'Maker' },
    model: { type: Schema.ObjectId, ref: 'Maker.models' },
    imageUrl: { type: String, default: '', trim: true },
    tags: { type: [], get: getTags, set: setTags },
    user: { type: Schema.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

ArticleSchema.index({ title: 'text', tags: 'text' });

ArticleSchema.path('title').required(true, 'An offer must have a title');
ArticleSchema.path('body').required(true, 'An offer must have a body');
ArticleSchema.path('year').required(true, 'An offer must have a year');
ArticleSchema.path('price').required(true, 'An offer must have a price');
ArticleSchema.path('model').required(true, 'An offer must have a model');
ArticleSchema.path('maker').validate(function (makerId, fn) {
    const Maker = mongoose.model('Maker');
    
    Maker.findOne({ _id: makerId }, function (err, maker) {
        if (err || !maker) fn(false);
        else fn(true);
    });
}, 'Maker does not exist');

/**
 * Statics
 */
ArticleSchema.statics = {
    /**
     * Find offer by id
     * 
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */
    load: function (_id, cb) {
        return this.findOne({ _id })
            .select('title model maker user body year price imageUrl tags createdAt')
            .populate('maker', 'name models')
            .populate('user', 'username email')
            .exec(cb);
    },
    
    /**
     * List all offers
     * 
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    list: function (options, cb) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .select('title model maker user body year price imageUrl tags createdAt')
            .populate('maker', 'name models')
            .populate('user', 'username email')
            .sort({ createdAt: -1 })
            .skip(limit * page)
            .limit(limit)            
            .exec(cb);
    },

    /**
     * Search in the articles based on indexes
     * 
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    textSearch: function (options, cb) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria, { score: { $meta: "textScore" }})
            .sort({ score: { $meta: "textScore" }})
            .select('title model maker user body year price imageUrl tags createdAt')
            .populate('maker', 'name models')
            .populate('user', 'username email')
            .skip(limit * page)
            .limit(limit)
            .exec(cb);
    }
};

module.exports = mongoose.model('Article', ArticleSchema);
