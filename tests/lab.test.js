var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('lab(61, 53, 31)');

  t.true(c.red === 241 && c.green === 102 && c.blue === 94 && c.alpha === 1);
});

test('should return a valid lab string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.is(c.tolab(), 'lab(61.024, 51.837, 30.786)');
});
