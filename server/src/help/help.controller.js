'use strict';

var Help = require('./help.model');

/**
 * GET /helps
 *
 * @description
 * list of helps
 *
 */
exports.find = function (req, res, next) {
    Help.find({ location :{ $near :
        { $geometry :
          { type : "Point" ,
            coordinates : req.body.location.coordinates ,
            $maxDistance : 5000
        } }
    }}, function (err, helps) {
        if (err) {
            return next(err);
        }
        return res.status(200).json(helps);
    });
};

/**
 * GET /helps/:id
 *
 * @description
 * Find Help by id
 *
 */
exports.get = function (req, res, next) {
    Help.findById(req.params.id, function (err, Help) {
        if (err) {
            return next(err);
        }
        if (!Help) {
            return res.status(404).send('Not Found');
        }
        return res.status(200).json(Help);
    });
};

/**
 * POST /Helps
 *
 * @description
 * Create a new Help
 *
 */
exports.post = function (req, res, next) {
    Help.create(req.body, function (err, Help) {
        if (err) {
            return next(err);
        }
        return res.status(201).json(Help);
    });
};


