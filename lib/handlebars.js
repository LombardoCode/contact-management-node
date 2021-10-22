const helpers = {};

helpers.equalsTo = function(a, b) {
  return (a === b);
};

helpers.greaterThan = function(a, b) {
  return (a > b);
};

helpers.greaterOrEqualTo = function(a, b) {
  return (a >= b);
};

helpers.lessThan = function(a, b) {
  return (a < b);
};

helpers.lessOrEqualTo = function(a, b) {
  return (a <= b);
};

helpers.notEqualTo = function(a, b) {
  return (a !== b);
};


module.exports = helpers;
