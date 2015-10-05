var lineParser = require('./line-parser');
var Decimal = require('decimal.js');

/**
* Creates a new basket object on which two basic operations can be called:
* addLine and getTotals
*
* @method create
* @return {Object} An object with the basic basket opertations
*/
exports.create = function() {

  var basket = {
    lines: [],
    totalTaxes: new Decimal(0.0),
    totalAmount: new Decimal(0.0),
  };

  var addLine = function(line,fn) {
    var basketLine = lineParser.parse(line);
    basket.lines.push(basketLine);
    basket.totalTaxes = basket.totalTaxes.plus(basketLine.lineTaxes);
    basket.totalAmount = basket.totalAmount.plus(basketLine.lineBasePrice).plus(basketLine.lineTaxes);
    return basketLine;
  };

  var getTotals = function(fn) {
    return fn(basket.totalAmount,basket.totalTaxes);
  };

  return {
    addLine: addLine,
    getTotals: getTotals
  };

};
