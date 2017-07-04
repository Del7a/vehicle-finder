'use strict';

const mongoose = require('mongoose');
const ModelSchema = require('./model');

const Schema = mongoose.Schema;

const MakerSchema = new Schema({
    name: { type: String, default: '', trim: true },
    models: [ModelSchema]
});

MakerSchema.path('name').required(true, 'Maker must have a name');

MakerSchema.path('name').validate(function (name, fn) {
    const Maker = mongoose.model('Maker');

    if (this.isNew || this.isModified('name')) {
        Maker.find({ name: name }).exec(function (err, makers) {
            fn(!err && makers.length === 0);
        });
    } else fn(true);
}, 'There is already a maker with that name');

/**
 * Methods
 */
MakerSchema.methods = {
    /**
     * Add model
     * 
     * @param {String} name
     * @param {Function} cb
     * @api private
     */
    addModel: function (name, cb) {
        this.models.push({ name: name });
        return this.save(function (err) {
            return cb(err);
        });
    },

    /**
     * Remove model
     * 
     * @param {modelId} modelId
     * @param {Function} cb
     * @api private
     */
    removeModel: function (modelId, cb) {
        const index = this.models
            .map(model => model.id)
            .indexOf(modelId);

        if (~index) this.models.splice(index, 1);
        else throw new Error('Model not found');
        return this.save(function (err) {
            return cb(err);
        });
    }
};

/**
 * Statics
 */
MakerSchema.statics = {
    /**
     * Find maker by id
     *
     * @param {ObjectId} id
     * @param {Function} cb
     * @api private
     */
    load: function (_id, cb) {
        return this.findOne({ _id })
            .select('name models')
            .exec(cb);
    }
};

module.exports = mongoose.model('Maker', MakerSchema);
