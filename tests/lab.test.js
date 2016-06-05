var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('lab(61, 53, 31)'),
    d = new Color('lab(91.28654738944347, -3.6725617351839017, 52.83941149939641)');

  t.true(c.red === 241 && c.green === 102 && c.blue === 94 && c.alpha === 1);
  t.true(d.red === 255 && d.green === 227 && d.blue === 129 && d.alpha === 1);
});

test('should return a valid lab string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.is(c.tolab(), 'lab(61.024, 51.837, 30.786)');
});
