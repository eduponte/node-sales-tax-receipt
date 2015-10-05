var util = require('util');
var split = require('split');
var receiptStream = require('./receipt-stream');
var PassThrough = require('stream').PassThrough;

var StreamCombiner = function() {

  this.streams = Array.prototype.slice.apply(arguments);

  // When a source stream is piped to us, undo that pipe, and save
  // off the source stream piped into our internally managed streams.
  this.on('pipe', function(source) {
    source.unpipe(this);
    for(var i in this.streams) {
      source = source.pipe(this.streams[i]);
    }
    this.transformStream = source;
  });

  PassThrough.call(this, {}); // invoke Transform's constructor
};

util.inherits(StreamCombiner, PassThrough);

// When we're piped to another stream, instead pipe our internal
// transform stream to that destination.
StreamCombiner.prototype.pipe = function(dest, options) {
  return this.transformStream.pipe(dest, options);
};

module.exports = function() {
  return new StreamCombiner(split(), receiptStream());
};
