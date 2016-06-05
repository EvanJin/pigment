var test = require('ava');
var Color = require('../basic.js');

test('should create a valid color object', function(t) {
  var c = new Color('crimson');

  t.true(c.red === 220 && c.green === 20 && c.blue === 60 && c.alpha === 1);
});

test('should return a valid name', function(t) {
  var c = new Color({ red: 210, green: 105, blue: 30 });

  t.is(c.toname(), 'chocolate');
});

test('should work with transparent color', function(t) {
  var c = new Color({ red: 0, green: 0, blue: 0, alpha: 0 }),
    d = new Color('transparent');

  t.is(c.toname(), 'transparent');
  t.true(d.red === 0 && d.green === 0 && d.blue === 0 && d.alpha === 0);
});
