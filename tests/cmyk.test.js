var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('cmyk(0, 40, 56, 4)');

  t.true(c.red === 245 && c.green === 147 && c.blue === 108 && c.alpha === 1);
});

test('should return a valid cmyk string', function(t) {
  var c = new Color({ red: 145, green: 100, blue: 171 });

  t.is(c.tocmyk(), 'cmyk(15, 42, 0, 33)');
});
