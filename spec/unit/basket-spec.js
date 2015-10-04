var expect = require('chai').expect;
var Decimal = require('decimal.js');

var basketFactory = require('../../app/basket');

describe('basket', function() {

  it('creates empty basket', function() {
    var basket = basketFactory.create();
    expect(basket.addLine).to.be.a('function');
    expect(basket.getTotals).to.be.a('function');
  });

  it('adds lines', function() {
    var basket = basketFactory.create();
    var basketLine = basket.addLine('1 imported bottle of perfume at 47.50');
    expect(basketLine).to.deep.equal({
      quantity: 1,
      description: 'imported bottle of perfume',
      lineTaxes: new Decimal(7.15),
      shelfPrice: new Decimal(47.50),
      lineBasePrice: new Decimal(47.50)
    });
  });

  it('keeps totals for the final summary', function(done) {
    var basket = basketFactory.create();
    var basketLine = basket.addLine('1 imported bottle of perfume at 47.50');
    basket.getTotals(function(tot,tax) {
      expect(tot.toNumber()).to.eq(54.65);
      expect(tax.toNumber()).to.eq(7.15);
      done();
    });
  });

  it('accumulates totals for the final summary', function(done) {
    var basket = basketFactory.create();
    var basketLine = basket.addLine('1 imported bottle of perfume at 47.50');
    var basketLine = basket.addLine('1 ding dong at 6.30');
    basket.getTotals(function(tot,tax) {
      expect(tot.toNumber()).to.eq(61.60);
      expect(tax.toNumber()).to.eq(7.80);
      done();
    });
  });

});
