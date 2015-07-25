var test = require('tape');
var traverse = require('../').async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async reduce', function (t) {
    t.plan(1);

    var obj = { x : 3 };
    traverse(obj).reduce(function (acc, x, cb) {
        cb(null, acc + 1);
    }, 0, function (err, acc) {
        t.equal(acc, 1);
    });
});
