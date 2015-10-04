var fs = require('fs');
var split = require('split');
var expect = require('chai').expect;

var Receipt = require('../../app/receipt');

describe('receipt', function() {

  var actualOutput;

  beforeEach(function(done) {
    actualOutput = '';
    done();
  });

  afterEach(function(done) {
    done();
  });

  it('outputs a basic receipt', function(done) {
    fs.createReadStream('spec/resources/input1.txt', 'utf8')
      .pipe(split())
      .pipe(new Receipt())
      .on('data', function(data) {
        actualOutput += data;
      }).on('finish', function() {
        var expected = fs.readFileSync('spec/resources/output1.match', 'utf8');
        expect(actualOutput).to.equal(expected);
        done();
      });
  });

  it('outputs an import receipt', function(done) {
    fs.createReadStream('spec/resources/input2.txt', 'utf8')
      .pipe(split())
      .pipe(new Receipt())
      .on('data', function(data) {
        actualOutput += data;
      }).on('finish', function() {
        var expected = fs.readFileSync('spec/resources/output2.match', 'utf8');
        expect(actualOutput).to.equal(expected);
        done();
      });
  });

  it('outputs a mixed up receipt', function(done) {
    fs.createReadStream('spec/resources/input3.txt', 'utf8')
      .pipe(split())
      .pipe(new Receipt())
      .on('data', function(data) {
        actualOutput += data;
      }).on('finish', function() {
        var expected = fs.readFileSync('spec/resources/output3.match', 'utf8');
        expect(actualOutput).to.equal(expected);
        done();
      });
  });
});
