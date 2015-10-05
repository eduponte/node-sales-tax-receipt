# node-sales-tax-receipt
Sales tax exercise using javascript node technologies.

## The app

Just type:

    npm install

And see what happens on providing an input:

    node app.js < ./spec/resources/input3.txt

The app takes a raw basket in the format:

```
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 box of imported chocolates at 11.25
```

and outputs a receipt:
```
1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
1 imported box of chocolates: 11.85
Sales Taxes: 6.70
Total: 74.68
```

## The app

The implementation is based upon node streams. The ```receipt``` is a transform stream that takes the raw basket and outputs the corresponding receipt.

It can be used like that:

```
var receipt = require('./app/receipt');

process.stdin
  .pipe(receipt())
  .pipe(process.stdout);
```
The internal collaborating modules are:
- ```receipt```: the main transform stream. It pipes the the source through an initial ```split``` transform and then a ```receipt-stream``` transform for every basket line.
- ```basket```: The basket builder. Creates a new basket object on which two basic operations can be called: ```addLine``` and ```getTotals```.
- ```line-parser```: Parses a (string) line in its input format and builds a basket line with the properties needed to output a receipt.
- ```product```: Creates a product object from its raw description. This implementation bases its tax and final product name decisions on keyword matching. More sophisticated approaches could consider other product catalogs, such as DBs.
- ```formatter```: Outputs the receipt lines according to the expected receipt format.

## The specs

The ```spec``` folder contains both unit and integration tests. Specs are run by [mocha](https://mochajs.org/). [chai](http://chaijs.com/) does a good job regarding assertions.
- The integration spec tests E2E the transform stream. It matches the output for known inputs with its expected receipts.
- The unit specs test the different modules in the system, focusing on each particular module exports.

You can run the tests:

    npm test

And hopefully you will get an output similar to that:

```
  receipt
    V outputs a basic receipt
    V outputs an import receipt
    V outputs a mixed up receipt

  basket
    V creates empty basket
    V adds lines
    V keeps totals for the final summary
    V accumulates totals for the final summary

  formatter
    V formats line details
    V formats line details with taxes
    V formats taxes
    V formats totals
    V formats huge totals

  line-parser
    V gets quantity
    V gets shelf price
    V gets full line base price
    V rearranges product name on an imported line
    V decides taxes on an imported line
    V decides taxes on an exempt line
    V decides taxes on a non exempt line

  product
    V creates a regular product
    V creates an exempt national product given a name
    V creates an exempt imported product given a name
    V creates a regular but imported product given a name

  receipt stream
    V creates a transformer that can be piped
    V keeps a basket where it can accumulate totals
    V outputs a basic line with totals


  26 passing (44ms)
```
