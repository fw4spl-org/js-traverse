var test = require('tape');
var traverse = require('../');
var traverseAsync = traverse.async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async paths', function (t) {

    var expected = [[],["x"],["x","y"],["a"]];
    t.deepEqual(traverse(obj).paths(), expected);

    t.plan(1);

    var obj = { x : { y : 2 }, a: 4 };
    traverseAsync(obj).paths(function (err, paths) {
        t.deepEqual(paths, expected);
    });
});
