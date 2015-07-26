var test = require('tape');
var traverse = require('../');
var traverseAsync = traverse.async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async paths', function (t) {
    t.plan(2);

    var obj = { x : { y : 2 }, a: 4 };

    var expected = [[],["x"],["x","y"],["a"]];
    var sync = traverse(obj).paths();
    t.deepEqual(sync, expected);

    traverseAsync(obj).paths(function (err, paths) {
        t.deepEqual(paths, expected);
    });
});
