var test = require('tape');
var traverse = require('../').async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async each', function (t) {
    t.plan(1);
    
    var obj = { x : 3 };
    traverse(obj).forEach(function (x, cb) {
      cb(null);
    }, function (err, newObj) {
        t.pass();
        console.log('done', arguments);
    });
});
