'use strict';

var express = require('express');
var router = express.Router();

var thing = require('./thing/thing.controller');
var help = require('./help/help.controller');

// things ressources
router.get('/api/things', thing.find);
router.get('/api/things/:id', thing.get);
router.post('/api/things', thing.post);
router.put('/api/things/:id', thing.put);
router.post('/api/help/', help.post);
router.get('/api/help/', help.find);
module.exports = router;
