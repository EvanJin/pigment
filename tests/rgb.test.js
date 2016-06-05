var test = require('ava');
var Color = require('../basic.js');

test('should create a valid color object', function(t) {
  var c = new Color('rgb(240, 104, 96)'),
    d = new Color('rgba(233, 240, 96, .5)');

  t.true(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
  t.true(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.5);
});

test('should return a valid rgba string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

  t.is(c.torgb(), 'rgb(240, 104, 96)');
  t.is(c.torgba(), 'rgba(240, 104, 96, 0.3)');
});

test('should return luminance of color', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.is(c.luminance(), 0.29270422282503833);
});

test('should return darkness of color', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.is(c.darkness(), 0.4362666666666666);
});

test('should return negative of color', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96 });

  t.is(c.negate().torgb(), 'rgb(15, 151, 159)');
});

test('should return greyscale color', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

  t.is(c.greyscale().torgb(), 'rgb(143.75199999999998, 143.75199999999998, 143.75199999999998)');
  t.is(c.grayscale().torgb(), 'rgb(143.75199999999998, 143.75199999999998, 143.75199999999998)');
});

test('should mix color', function(t) {
  var c = new Color('rgb(240, 104, 96)'),
    d = new Color('rgb(233, 240, 96)');

  t.is(c.mix(d, 0.7).torgb(), 'rgb(235, 199, 96)');
  t.is(c.mix(d, 0.4).torgb(), 'rgb(237, 158, 96)');
});
