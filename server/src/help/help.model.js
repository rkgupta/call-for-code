'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HelpSchema = new Schema({
    name: String,
    role: String,
    age: Number,
    gender: String,
    phone: String,
    organization: String,
    help: {
        food: Boolean,
        clothing: Boolean,
        medicine: Boolean,
        evacuation: Boolean
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

HelpSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model('Help', HelpSchema);
