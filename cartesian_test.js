var assert = require('assert');
var cartesian = require('./cartesian.js').cartesian;


describe('cartesian', function() {
  it('performs basic cartesian product', function() {
    var a = [1, 2, 3];
    var b = [4, 5, 6];

    assert.deepEqual(cartesian(a, b), [
      [1, 4], [1, 5], [1, 6],
      [2, 4], [2, 5], [2, 6],
      [3, 4], [3, 5], [3, 6]
    ]);
  });

  it('performs cartesian product on 3 arrays', function() {
    var a = [1, 2, 3];
    var b = [4, 5, 6];
    var c = [7, 8, 9];

    assert.deepEqual(cartesian(a, b, c), [
      [1,4,7],[1,4,8],[1,4,9],
      [1,5,7],[1,5,8],[1,5,9],
      [1,6,7],[1,6,8],[1,6,9],
      [2,4,7],[2,4,8],[2,4,9],
      [2,5,7],[2,5,8],[2,5,9],
      [2,6,7],[2,6,8],[2,6,9],
      [3,4,7],[3,4,8],[3,4,9],
      [3,5,7],[3,5,8],[3,5,9],
      [3,6,7],[3,6,8],[3,6,9],
    ]);
  });

  it('can use string as accessor', function() {
    var coll = [
      {subcoll: [1,2,3]},
      {subcoll: [4,5,6]}
    ];

    assert.deepEqual(cartesian(coll, 'subcoll'), [
      [coll[0], 1], [coll[0], 2], [coll[0], 3],
      [coll[1], 4], [coll[1], 5], [coll[1], 6]
    ]);
  });

  it('can use dotted string as accessor', function() {
    var coll = [
      {subcoll: {deeper: [1,2,3]}},
      {subcoll: {deeper: [4,5,6]}}
    ];

    assert.deepEqual(cartesian(coll, 'subcoll.deeper'), [
      [coll[0], 1], [coll[0], 2], [coll[0], 3],
      [coll[1], 4], [coll[1], 5], [coll[1], 6]
    ]);
  });

  it('can use function as accessor', function() {
    var coll = [
      {subcoll: [1,2,3]},
      {subcoll: [4,5,6]}
    ];

    assert.deepEqual(cartesian(coll, function(x) {
      return x.subcoll.slice(1);
    }), [
      [coll[0], 2], [coll[0], 3],
      [coll[1], 5], [coll[1], 6]
    ]);
  });
});
