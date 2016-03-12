var _ = require('lodash');

// returns an array of separated digits
var getDigits = function(m) {
  var str = m.toString();
  var strDigits = str.split('');
  var digits = strDigits.map(function(strDigit){
    return parseInt(strDigit);
  });
  return digits;
};

// tests for rule 0:
// returns true if one of the digits is the sum of the others.
// otherwise returns false.
var test0 = function(m) {
  var digits = getDigits(m);
  digits = digits.sort(function(a,b){return b-a;});
  var highest = digits[0];
  var others = _.tail(digits);
  var sum = others.reduce(function(a,b){return a+b;}, 0);
  return highest === sum;
};

// tests for rule 1:
// returns true if the sum of the divisors of M is greater than M
// this is always true unless M = 1, as a number's divisors are at least itself and 1
var test1 = function(m) {
  return m !== 1;
};

// tests for rule 2:
// returns true if M has at least 2 odd digits
var test2 = function(m) {
  var digits = getDigits(m);
  var oddCount = 0;
  _.forEach(digits,function(digit){
    if (digit%2 !== 0) {
      oddCount++;
    }
  });
  return oddCount>=2;
};

// tests for rule 3:
// returns true if all digits are different
var test3 = function(m) {
  var digits = getDigits(m);
  return _.isEqual(_.uniq(digits), digits);
};

// tests for rule 4:
// returns true if the 4th digit is even
var test4 = function(m) {
  var digits = getDigits(m);
  return digits[3]%2 === 0;
};

// tests for rule 5:
// returns true if the product of all digits is not a multiple of 5
var test5 = function(m) {
  var digits = getDigits(m);
  var product = digits.reduce(function(a,b){return a*b;}, 1);
  return product%5 !== 0;
};

// tests for rule 6:
// returns true if the number contains 3 odd digits in a row
var test6 = function(m) {
  var digits = getDigits(m);
  var oddInaRow = 0;
  for (var i = 0; i<digits.length; i++) {
    if (digits[i] % 2 !== 0) {
      oddInaRow++;
    } else {
      oddInaRow = 0;
    }
    if (oddInaRow >= 3){
      return true;
    }
  }
  return false;
};

// tests for rule 7:
// returns true if the number is prime.
var test7 = function(m) {
  for (var i = 2; i <= Math.sqrt(m); i++)
    if (m % i === 0) return false;
  return true;
};

// tests for rule 8:
// returns true if M has at least 2 even digits in a row
var test8 = function(m) {
  var digits = getDigits(m);
  var evenInaRow = 0;
  for (var i = 0; i<digits.length; i++) {
    if (digits[i] % 2 === 0) {
      evenInaRow++;
    } else {
      evenInaRow = 0;
    }
    if (evenInaRow >= 2){
      return true;
    }
  }
  return false;
};

// tests for rule 9:
// returns true if the product of all odd digits is a square number

var test9 = function(m) {
  var digits = getDigits(m);
  var hasOddDigit = false;
  var oddProduct = 1;
  _.forEach(digits,function(digit){
    if (digit%2 !== 0){
      hasOddDigit = true;
      oddProduct = oddProduct * digit;
    }
  });
  if (hasOddDigit) {
    root = Math.sqrt(oddProduct);
    return Math.floor(root) === root;
  }
  return false;
};

var ruleTests = [
  test0,
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  test7,
  test8,
  test9
];

var findMagicNumber = function(){
  var allDigits = [];
  for (var i = 0; i<10; i++) {
    allDigits.push(i);
  }
  test: for (var m = 0; m<10000; m++) {
    var digits = getDigits(m);
    var rulesTrue = _.uniq(digits);
    var rulesFalse = _.difference(allDigits, rulesTrue);

    for (var i = 0; i<rulesTrue.length; i++) {
      if (!ruleTests[rulesTrue[i]](m)) {
        continue test;
      }
    }
    for (var i = 0; i<rulesFalse.length; i++) {
      if (ruleTests[rulesFalse[i]](m)) {
        continue test;
      }
    }
    return m;
  }
}

console.log('The magic number is',findMagicNumber());
