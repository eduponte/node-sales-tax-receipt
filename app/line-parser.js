var product = require('./product');
var Decimal = require('decimal.js');

var round = function(rawTax) {
  var rawRounded = rawTax.toFixed(2);
  var last = parseInt(rawRounded.slice(-1)),
    increment = 0;

  if (last > 0 && last <= 5) {
    increment += (5 - last);
  } else if (last > 5) {
    increment += (10 - last);
  }
  var roundedVal = (new Decimal(rawRounded).plus(new Decimal(increment).dividedBy(100)));
  return roundedVal;
};

/**
* Parses a (string) line in its input format and builds a basket line with the
* properties needed to output a receipt.
*
* @method parse
* @param {String} The line in its input format
* @return {Object} The basket line, with its quantity, description, lineTaxes, shelfPrine and lineBasePrice properties
*/
exports.parse = function(line) {
  if (line) {
    var splitted = line.split(/\s+/);

    var quantity = parseInt(splitted.shift()),
      shelfPrice = new Decimal(splitted.pop()),
      at = splitted.pop(),
      rawProduct = splitted.join(' '),
      lineBasePrice = new Decimal(shelfPrice).times(quantity);

    var prod = product.create(rawProduct);

    return {
      quantity: quantity,
      description: prod.name,
      lineTaxes: round(lineBasePrice.times(prod.taxes.totalPercent).dividedBy(100)),
      shelfPrice: shelfPrice,
      lineBasePrice: lineBasePrice
    };
  }
};
