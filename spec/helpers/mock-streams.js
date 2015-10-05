var Writable = require('stream').Writable;
var Readable = require('stream').Readable;
var util = require('util');

/* Writable memory stream */
function WritableStream() {
  Writable.call(this); // init super
  this.actualOutput = ''; // empty
}
util.inherits(WritableStream, Writable);

WritableStream.prototype._write = function(chunk, enc, cb) {
  this.actualOutput += chunk;
  cb();
};

function ReadableStream() {
  Readable.call(this, {
    objectMode: true
  });
}
util.inherits(ReadableStream, Readable);

ReadableStream.prototype._read = function noop() {};

exports.ReadableStream = ReadableStream;

exports.WritableStream = WritableStream;
