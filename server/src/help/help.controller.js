'use strict';

var Help = require('./help.model');
var mongoose  = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/callforcode');

/**
 *
 * @description
 * list of things
 *
 */

/**
 * POST /things
 *
 * @description
 * Create a new thing
 *
 */

exports.post = function(req, res, next) {
    var item = req.body.help.food==true ? "Food" : "";
    item += req.body.help.clothing==true ? "Clothing" : "";
    item += req.body.help.medicine==true ? "Medicine" : "";
    item += req.body.help.evacuation==true ? "Evacuation" : "";
    item = item.replace(/([A-Z])/g, ', $1').trim().substr(2);
    const help = Help({
        name: req.body.name,
        organization: req.body.organization,
        age: req.body.age,
        phone: req.body.phone,
        items: item
    });
    help.save(function(err){
      if(err){
          res.send(err);
      }
      res.json(help);
  });
};

exports.find = function(req, res, next) {
  var searchText = req.query.item;
  const help =Help({
      items: searchText
  });
  Help.find({$text: { $search: searchText }},function (err, helps) {
      if(err){
          res.send(err);
      }
      res.json(helps);
  })
};

