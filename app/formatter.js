var Decimal = require('decimal.js');

exports.receiptLine = function(basketLine) {
  return basketLine.quantity + ' ' + basketLine.description + ': ' + (basketLine.lineBasePrice.plus(basketLine.lineTaxes)).toFixed(2) + '\n';
}

exports.receiptTaxes = function(totalTaxes) {
  return 'Sales Taxes: ' + totalTaxes.toFixed(2) + '\n';
}

exports.receiptTotal = function(totalAmount) {
  return 'Total: ' + totalAmount.toFixed(2) + '\n';
}
