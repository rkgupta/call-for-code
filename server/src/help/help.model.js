'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HelpSchema = new Schema({
    name: String,
    organization: String,
    age: String,
    phone: String,
    items: String
});

var Help = mongoose.model('Help', HelpSchema);


module.exports = Help;
