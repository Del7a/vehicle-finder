'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarModelSchema = new Schema({
    name: { type: String, default: '', trim: true },
    maker: { type: Schema.ObjectId, ref: 'Maker' }
});

CarModelSchema.path('name').required(true, 'Model must have a name');

CarModelSchema.path('maker').validate(function (makerId, fn) {
    const Maker = mongoose.model('Maker');
    
    Maker.findOne({ _id: makerId }, function (err, maker) {
        if (err || !maker) fn(false);
        else fn(true);
    });
}, 'Maker does not exist');

/**
 * Statics
 */
CarModelSchema.statics = {
    /**
     * Find model by id
     * 
     * @param {ObjectId} id
     * @api private
     */
    load: function (_id) {
        return this.findOne({ _id }) 
            .populate('maker', 'name')
            .exec();
    },

    /**
     * List all models
     * 
     * @param {Object} options
     * @api private
     */
    list: function (options) {
        const criteria = options.criteria || {};
        return this.find(criteria)
            .populate('maker', 'name')
            .exec();
    }
};

module.exports = mongoose.model('CarModel', CarModelSchema);
