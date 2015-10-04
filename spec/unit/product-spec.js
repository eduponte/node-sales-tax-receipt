var expect = require('chai').expect;
var Decimal = require('decimal.js');

var product = require('../../app/product');

describe('product', function() {

  it('creates a regular product', function() {
    var prod = product.create('box of pimpumpam');
    expect(prod).to.deep.deep.equals({
      isExempt: false,
      isImported: false,
      name: "box of pimpumpam",
      taxes: {
        basic: 10,
        imported: 0,
        totalPercent: 10
      }
    });
  });

  it('creates an exempt national product given a name', function() {
    var prod = product.create('box of chocolates');
    expect(prod).to.deep.deep.equals({
      isExempt: true,
      isImported: false,
      name: "box of chocolates",
      taxes: {
        basic: 0,
        imported: 0,
        totalPercent: 0
      }
    });
  });

  it('creates an exempt imported product given a name', function() {
    var prod = product.create('box of imported chocolates');
    expect(prod).to.deep.deep.equals({
      isExempt: true,
      isImported: true,
      name: "imported box of imported chocolates",
      taxes: {
        basic: 0,
        imported: 5,
        totalPercent: 5
      }
    });
  });

  it('creates a regular but imported product given a name', function() {
    var prod = product.create('box of imported trees');
    expect(prod).to.deep.deep.equals({
      isExempt: false,
      isImported: true,
      name: "imported box of trees",
      taxes: {
        basic: 10,
        imported: 5,
        totalPercent: 15
      }
    });
  });

});
