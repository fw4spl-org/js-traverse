var test = require('tape');
var traverse = require('../');
var traverseAsync = traverse.async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async nodes', function (t) {
    t.plan(2);

    var obj = { x : { y : 2 }, a: 4 };

    var expected = [ { x: { y: 2 }, a: 4 }, { y: 2 }, 2, 4 ];
    var sync = traverse(obj).nodes();
    t.deepEqual(sync, expected);

    traverseAsync(obj).nodes(function (err, nodes) {
        t.deepEqual(nodes, expected);
    });
});
