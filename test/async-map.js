var test = require('tape');
var traverse = require('../').async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async map', function (t) {
    t.plan(1);

    var obj = { x : 3 };
    traverse(obj).map(function (x, cb) {
        this.update('a');
        cb();
    }, function (err, newObj) {
        t.pass();
    });
});

test('async map update', function (t) {
    t.plan(1);

    var obj = { x: { y: 3 }};
    traverse(obj).map(function (x, cb) {
        if (this.key === 'y') {
            this.update({z: 0});
        }
        cb();
    }, function (err, newObj) {
        t.pass();
        console.log(JSON.stringify(obj, null, '  '));
        console.log(JSON.stringify(newObj, null, '  '));
    });
});
