var test = require('ava');
var Color = require('../basic.js');

test('should create a valid color object', function(t) {
  var c = new Color('#f06860');

  t.true(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
});

test('should return a valid hex string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.is(c.tohex(), '#f06860');
});
