var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('hsv(3, 60%, 94%)'),
    d = new Color('hsva(63, 60%, 94%, .3)');

  t.true(c.red === 240 && c.green === 103 && c.blue === 96 && c.alpha === 1);
  t.true(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.3);
});

test('should return a valid hsva string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.5 });

  t.is(c.tohsv(), 'hsv(3, 60%, 94%)');
  t.is(c.tohsva(), 'hsva(3, 60%, 94%, 0.5)');
  t.is(c.tohsb(), 'hsb(3, 60%, 94%)');
  t.is(c.tohsba(), 'hsba(3, 60%, 94%, 0.5)');
});
