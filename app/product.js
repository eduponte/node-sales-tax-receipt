var exemptKeywords = [
  'chocolate',
  'book',
  'pills'
];

var importedKeywords = [
  'imported'
];

var exemptRegExp = new RegExp(exemptKeywords.join("|")),
  importedRegExp = new RegExp(importedKeywords.join("|"));

var isExempt = function(product) {
  return (exemptRegExp.test(product));
};

var isImported = function(product) {
  return (importedRegExp.test(product));
};

var getTaxes = function(isExempt, isImported) {
  var basic = (isExempt ? 0 : 10),
    imported = (isImported ? 5 : 0);
  return {
    basic: basic,
    imported: imported,
    totalPercent: basic + imported
  };
};

/**
* Creates a product object from its raw description. This implementation bases
* its tax and final product name decisions on keyword matching. More
* sophisticated approaches could consider other product catalogs, such as DBs.
*
* @method create
* @param {String} raw product name
* @return {Object} The qualified product {isImported, isExempt, name, taxes}
*/
exports.create = function(rawName) {
  var imported = isImported(rawName),
    exempt = isExempt(rawName),
    name;

  if (imported) {
    name = 'imported ' + rawName.replace('imported ', '');
  } else {
    name = rawName;
  }

  return {
    isImported: isImported(rawName),
    isExempt: isExempt(rawName),
    name: name,
    taxes: getTaxes(exempt,imported)
  };
};
