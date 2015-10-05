var util = require("util");
var Transform = require("stream").Transform;

var basketFactory = require('./basket'),
  formatter = require('./formatter');

/**
* A transform stream that takes the input lines and pushes the formatted output
* lines. It performs a final flush operation to output totals.
*
* @class ReceiptStream
* @constructor
*/
function ReceiptStream() {
  Transform.call(this, {
    "objectMode": true
  }); // invoke Transform's constructor
  this.basket = basketFactory.create();
}

util.inherits(ReceiptStream, Transform); // inherit Transform

ReceiptStream.prototype._transform = function(line, encoding, done) {
  if (line) {
    var basketLine = this.basket.addLine(line);
    this.push(formatter.receiptLine(basketLine));
  }
  done();
};

ReceiptStream.prototype._flush = function(done) {
  this.basket.getTotals(function(totalAmount, totalTaxes) {
    this.push(formatter.receiptTaxes(totalTaxes));
    this.push(formatter.receiptTotal(totalAmount));
    done();
  }.bind(this));
};

/**
* Exports a new ReceiptStream.
*
* @return {ReceiptStream} The stream
*/
module.exports = function() {
  return new ReceiptStream();
};
