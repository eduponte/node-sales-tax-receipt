var expect = require('chai').expect;
var ReadableStream = require('../helpers/mock-streams').ReadableStream;
var WritableStream = require('../helpers/mock-streams').WritableStream;

var receiptStream = require('../../app/receipt-stream');

describe('receipt stream', function() {

  it('creates a transformer that can be piped', function() {
    receiptStm = receiptStream();
    expect(receiptStm).to.be.an.instanceof(require("stream").Transform);
  });

  it('keeps a basket where it can accumulate totals', function(done) {
    var ws = new WritableStream(),
      rs = new ReadableStream(),
      receiptStm = receiptStream();

    rs
      .pipe(receiptStm)
      .pipe(ws);

    ws.on('finish', function() {
      expect(receiptStm.basket.addLine).to.be.a('function');
      expect(receiptStm.basket.getTotals).to.be.a('function');
      receiptStm.basket.getTotals(function(tot,tax) {
        expect(tot.toNumber()).to.eq(16.49);
        expect(tax.toNumber()).to.eq(1.5);
        done();
      });
    });

    rs.push('1 music CD at 14.99');
    rs.push(null);
  });

  it('outputs a basic line with totals', function(done) {
    var ws = new WritableStream(),
      rs = new ReadableStream(),
      receiptStm = receiptStream();

    rs
      .pipe(receiptStm)
      .pipe(ws);

    ws.on('finish', function() {
      expect(this.actualOutput).to.equal(
        '1 music CD: 16.49\n' +
        'Sales Taxes: 1.50\n' +
        'Total: 16.49\n');
      done();
    });

    rs.push('1 music CD at 14.99');
    rs.push(null);
  });
});
