'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    name: { type: String, default: '', trim: true }
});

ModelSchema.path('name').required(true, 'Model must have a name');

/**
 * Statics
 */
ModelSchema.statics = {
    /**
     * Find model by id
     * 
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */
    load: function (_id, cb) {
        return this.findOne({ _id }) 
            .select('name')
            .exec(cb);
    }
};

module.exports = ModelSchema;
