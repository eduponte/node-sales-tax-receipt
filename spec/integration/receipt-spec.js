var fs = require('fs');
var expect = require('chai').expect;
var WritableStream = require('../helpers/mock-streams').WritableStream;

var receipt = require('../../app/receipt');

describe('receipt', function() {

  it('outputs a basic receipt', function(done) {
    var wstream = new WritableStream();

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
    var wstream = new WritableStream();

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
    var wstream = new WritableStream();

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
