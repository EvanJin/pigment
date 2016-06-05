var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('xyz(43, 29, 14)'),
    d = new Color('xyza(67, 80, 23, .3)');

  t.true(c.red === 241 && c.green === 102 && c.blue === 94 && c.alpha === 1);
  t.true(d.red === 234 && d.green === 239 && d.blue === 96 && d.alpha === 0.3);
});

test('should return a valid xyza string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

  t.is(c.toxyz(), 'xyz(43.00025581071994, 29.27569265351996, 14.449577808531906)');
  t.is(c.toxyza(), 'xyza(43.00025581071994, 29.27569265351996, 14.449577808531906, 0.3)');
});
