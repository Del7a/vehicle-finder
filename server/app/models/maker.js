'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MakerSchema = new Schema({
    name: { type: String, default: '', trim: true }
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

module.exports = mongoose.model('Maker', MakerSchema);
