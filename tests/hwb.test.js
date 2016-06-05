var test = require('ava');
var Color = require('../color.js');

test('should create a valid color object', function(t) {
  var c = new Color('hwb(3, 38%, 6%)'),
    d = new Color('hwba(63, 38%, 6%, .3)');

  t.true(c.red === 240 && c.green === 104 && c.blue === 97 && c.alpha === 1);
  t.true(d.red === 233 && d.green === 240 && d.blue === 97 && d.alpha === 0.3);
});

test('should return a valid hwba string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 97, alpha: 0.3 });

  t.is(c.tohwb(), 'hwb(3, 38%, 6%)');
  t.is(c.tohwba(), 'hwba(3, 38%, 6%, 0.3)');
});
