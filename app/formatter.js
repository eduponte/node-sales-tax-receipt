var Decimal = require('decimal.js');

/**
* Outputs a basket line in the expected receipt format.
*
* @method receiptLine
* @param {Object} A basket line with its properties
* @return {String} The line to output
*/
exports.receiptLine = function(basketLine) {
  return basketLine.quantity + ' ' + basketLine.description + ': ' + (basketLine.lineBasePrice.plus(basketLine.lineTaxes)).toFixed(2) + '\n';
};

/**
* Outputs a taxes line in the expected receipt format.
*
* @method receiptTaxes
* @param {Decimal} The total amount of taxes
* @return {String} The line to output
*/
exports.receiptTaxes = function(totalTaxes) {
  return 'Sales Taxes: ' + totalTaxes.toFixed(2) + '\n';
};

/**
* Outputs a basket total line in the expected receipt format.
*
* @method receiptTotal
* @param {Decimal} The total basket amount
* @return {String} The line to output
*/
exports.receiptTotal = function(totalAmount) {
  return 'Total: ' + totalAmount.toFixed(2) + '\n';
};
