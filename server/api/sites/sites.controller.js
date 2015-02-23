'use strict';

var _ = require('lodash');
var Sites = require('./sites.model');

// Get list of sitess
exports.index = function(req, res) {
  Sites.find(function (err, sitess) {
    if(err) { return handleError(res, err); }
    return res.json(200, sitess);
  });
};

// Get a single sites
exports.show = function(req, res) {
  Sites.findById(req.params.id, function (err, sites) {
    if(err) { return handleError(res, err); }
    if(!sites) { return res.send(404); }
    return res.json(sites);
  });
};

// Creates a new sites in the DB.
exports.create = function(req, res) {
  Sites.create(req.body, function(err, sites) {
    if(err) { return handleError(res, err); }
    return res.json(201, sites);
  });
};

// Updates an existing sites in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sites.findById(req.params.id, function (err, sites) {
    if (err) { return handleError(res, err); }
    if(!sites) { return res.send(404); }
    var updated = _.merge(sites, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sites);
    });
  });
};

// Deletes a sites from the DB.
exports.destroy = function(req, res) {
  Sites.findById(req.params.id, function (err, sites) {
    if(err) { return handleError(res, err); }
    if(!sites) { return res.send(404); }
    sites.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function createScreen(data) {
  var Pageres = require('pageres');
  var pageres = new Pageres({delay: 2})
      .src(data.url, ['480x320', '1024x768', 'iphone 5s'], {crop: true})
      .dest(__dirname);
  pageres.run(function (err) {
      if (err) {
          throw err;
      }
      console.log('done');
  });
}