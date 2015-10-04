process.stdout.setEncoding('utf8');
process.stdin.setEncoding('utf8');

var split = require('split');
var Receipt = require('./app/receipt');

process.stdin
  .pipe(split())
  .pipe(new Receipt())
  .pipe(process.stdout);
