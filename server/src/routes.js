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

// helps ressources
router.get('/api/helps', help.find);
router.get('/api/helps/:id', help.get);
router.post('/api/helps', help.post);

module.exports = router;
