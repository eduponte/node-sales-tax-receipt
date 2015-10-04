var expect = require('chai').expect;
var Decimal = require('decimal.js');

var formatter = require('../../app/formatter');

describe('formatter', function() {

  it('formats line details', function() {
    var line = formatter.receiptLine({
      quantity: 1,
      description: 'packet of headache pills',
      lineTaxes: new Decimal(0),
      shelfPrice: new Decimal(9.75),
      lineBasePrice: new Decimal(9.75)
    });
    expect(line).to.eq('1 packet of headache pills: 9.75\n');
  });

  it('formats line details with taxes', function() {
    var line = formatter.receiptLine({
      quantity: 1,
      description: 'packet of headache pills',
      lineTaxes: new Decimal(0.13),
      shelfPrice: new Decimal(9.75),
      lineBasePrice: new Decimal(9.75)
    });
    expect(line).to.eq('1 packet of headache pills: 9.88\n');
  });

  it('formats taxes', function() {
    expect(formatter.receiptTaxes(new Decimal(0.85))).to.eq('Sales Taxes: 0.85\n');
  });

  it('formats totals', function() {
    expect(formatter.receiptTotal(new Decimal(11865.32))).to.eq('Total: 11865.32\n');
  });

  it('formats huge totals', function() {
    expect(formatter.receiptTotal(new Decimal(600000000000.32))).to.eq('Total: 600000000000.32\n');
  });

});
