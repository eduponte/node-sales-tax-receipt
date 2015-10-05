var expect = require('chai').expect;

var lineParser = require('../../app/line-parser');

describe('line-parser', function() {

  it('gets quantity', function() {
    var line = lineParser.parse('1 box of chocolates at 11.25');
    expect(line.quantity).to.eq(1);
  });

  it('gets shelf price', function() {
    var line = lineParser.parse('1 box of chocolates at 11.25');
    expect(line.shelfPrice.toNumber()).to.eq(11.25);
  });

  it('gets full line base price', function() {
    var line = lineParser.parse('2 box of chocolates at 11.25');
    expect(line.lineBasePrice.toNumber()).to.eq(22.5);
  });

  it('rearranges product name on an imported line', function() {
    var line = lineParser.parse('1 box of imported chocolates at 11.25');
    expect(line.description).to.eq('imported box of chocolates');
  });

  it('decides taxes on an imported line', function() {
    var line = lineParser.parse('1 box of imported chocolates at 11.25');
    expect(line.lineTaxes.toNumber()).to.eq(0.60);
  });

  it('decides taxes on an exempt line', function() {
    var line = lineParser.parse('1 box of chocolates at 11.25');
    expect(line.lineTaxes.toNumber()).to.eq(0);
  });

  it('decides taxes on a non exempt line', function() {
    var line = lineParser.parse('1 yamayama at 11.25');
    expect(line.lineTaxes.toNumber()).to.eq(1.15);
  });

});
