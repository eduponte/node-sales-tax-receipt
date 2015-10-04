var exemptKeywords = [
  'chocolate',
  'book',
  'pills'
]

var importedKeywords = [
  'imported'
]

var exemptRegExp = new RegExp(exemptKeywords.join("|"))
  importedRegExp = new RegExp(importedKeywords.join("|"));

var isExempt = function(product) {
  return (exemptRegExp.test(product));
}

var isImported = function(product) {
  return (importedRegExp.test(product));
}

var getTaxes = function(isExempt, isImported) {
  var basic = (isExempt ? 0 : 10),
    imported = (isImported ? 5 : 0);
  return {
    basic: basic,
    imported: imported,
    totalPercent: basic + imported
  }
}

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
  }
}
