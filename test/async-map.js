var test = require('tape');
var traverse = require('../').async;
var deepEqual = require('./lib/deep_equal');
var util = require('util');

test('async map', function (t) {
    t.plan(1);
    
    var obj = { x : 3 };
    traverse(obj).map(function (x, cb) {
      this.update('a');
      cb(null);
    }, function (err, newObj) {
        t.pass();
        console.log('done', arguments);
    });
});
