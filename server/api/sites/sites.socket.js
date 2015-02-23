/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sites = require('./sites.model');

exports.register = function(socket) {
  Sites.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sites.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sites:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sites:remove', doc);
}