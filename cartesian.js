(function() {

  var ArrProto = Array.prototype;
  var reduce = ArrProto.reduce;
  var concat = ArrProto.concat;
  var isString = function(object) {
    return toString.call(object) == '[object String]';
  };
  var isFunction = function(object) {
    return toString.call(object) == '[object Function]';
  };

  var cartesian = function() {
    return reduce.call(arguments, function(a, b) {
      return concat.apply([], a.map(function(x) {
        var target = b;
        if (isString(b)) {
          target = b.split('.').reduce(function(obj, i) {return obj[i];}, x[0]);
        } else if (isFunction(b)) {
          target = b(x[0]);
        }
        return target.map(function(y) {
          return concat.apply(x, [y]);
        });
      }));
    }, [ [] ]);
  };

  exports.cartesian = cartesian;
}).call(this);
