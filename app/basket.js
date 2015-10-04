var lineBuilder = require('./line-builder');
var Decimal = require('decimal.js');

exports.create = function() {

  var basket = {
    lines: [],
    totalTaxes: new Decimal(0.0),
    totalAmount: new Decimal(0.0),
  }

  var addLine = function(line,fn) {
    var basketLine = lineBuilder.parse(line);
    basket.lines.push(basketLine);
    basket.totalTaxes = basket.totalTaxes.plus(basketLine.lineTaxes);
    basket.totalAmount = basket.totalAmount.plus(basketLine.lineBasePrice).plus(basketLine.lineTaxes);
    return basketLine;
  }

  var getTotals = function(fn) {
    return fn(basket.totalAmount,basket.totalTaxes);
  }

  return {
    addLine: addLine,
    getTotals: getTotals
  }

}
