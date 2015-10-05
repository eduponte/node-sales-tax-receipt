var fs = require('fs');
var expect = require('chai').expect;
var util = require('util');
var Writable = require('stream').Writable;

var receipt = require('../../app/receipt');

describe('receipt', function() {

  /* Writable memory stream */
  function WMStrm() {
    Writable.call(this); // init super
    this.actualOutput = ''; // empty
  }
  util.inherits(WMStrm, Writable);

  WMStrm.prototype._write = function(chunk, enc, cb) {
    this.actualOutput += chunk;
    cb();
  };

  beforeEach(function(done) {
    done();
  });

  afterEach(function(done) {
    done();
  });

  it('outputs a basic receipt', function(done) {
    var wstream = new WMStrm();

    fs.createReadStream('spec/resources/input1.txt', 'utf8')
      .pipe(receipt())
      .pipe(wstream);

    wstream.on('finish', function() {
      var expected = fs.readFileSync('spec/resources/output1.match', 'utf8');
      expect(this.actualOutput).to.equal(expected);
      done();
    });
  });

  it('outputs an import receipt', function(done) {
    var wstream = new WMStrm();

    fs.createReadStream('spec/resources/input2.txt', 'utf8')
      .pipe(receipt())
      .pipe(wstream);

    wstream.on('finish', function() {
      var expected = fs.readFileSync('spec/resources/output2.match', 'utf8');
      expect(this.actualOutput).to.equal(expected);
      done();
    });
  });

  it('outputs a mixed up receipt', function(done) {
    var wstream = new WMStrm();

    fs.createReadStream('spec/resources/input3.txt', 'utf8')
      .pipe(receipt())
      .pipe(wstream);

    wstream.on('finish', function() {
      var expected = fs.readFileSync('spec/resources/output3.match', 'utf8');
      expect(this.actualOutput).to.equal(expected);
      done();
    });
  });
});
