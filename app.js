process.stdout.setEncoding('utf8');
process.stdin.setEncoding('utf8');

var receipt = require('./app/receipt');

process.stdin
  .pipe(receipt())
  .pipe(process.stdout);
