'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

const ArticleSchema = new Schema({
    title: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    year: { type: Number, default: 0, },
    build: {
        maker: { type: Schema.ObjectId, ref: 'Maker' },
        model: { type: String, default: '', trim: true },
        modelName: { type: String, default: '', trim: true }
    },
    user: { type: Schema.ObjectId, ref: 'User' },
    tags: { type: [], get: getTags, set: setTags },
    imageUrl: { type: String, default: '', trim: true },
    createdAt: { type: Date, default: Date.now }
});

ArticleSchema.path('title').required(true, 'An offer must have a title');
ArticleSchema.path('body').required(true, 'An offer must have a body');
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
            .populate('build.maker', 'name')
            .populate('user', 'username email')
            .exec(cb);
    },
    
    /**
     * List all offers
     * 
     * @param {Object} options
     * @api private
     */
    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            .populate('model', 'name maker')
            .populate('user', 'username email')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};

module.exports = mongoose.model('Article', ArticleSchema);
