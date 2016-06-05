var test = require('ava');
var Color = require('../basic.js');

test('should create a valid color object', function(t) {
  var c = new Color('hsl(3, 83%, 66%)'),
    d = new Color('hsla(63, 83%, 66%, .3)');

  t.true(c.red === 240 && c.green === 104 && c.blue === 96 && c.alpha === 1);
  t.true(d.red === 233 && d.green === 240 && d.blue === 96 && d.alpha === 0.3);
});

test('should return a valid hsla string', function(t) {
  var c = new Color({ red: 240, green: 104, blue: 96, alpha: 0.3 });

  t.is(c.tohsl(), 'hsl(3, 83%, 66%)');
  t.is(c.tohsla(), 'hsla(3, 83%, 66%, 0.3)');
});

test('should rotate hue', function(t) {
  var c = new Color('hsl(3, 83%, 66%)');

  t.is(c.rotate(30).tohsl(), 'hsl(33, 83%, 66%)');
  t.is(c.rotate(240).tohsl(), 'hsl(243, 83%, 66%)');
});

test('should saturate color', function(t) {
  var c = new Color('hsl(3, 83%, 66%)');

  t.is(c.saturate(0.4).tohsl(), 'hsl(3, 116%, 66%)');
  t.is(c.saturate(0.7).tohsl(), 'hsl(3, 141%, 66%)');
});

test('should desaturate color', function(t) {
  var c = new Color('hsl(3, 83%, 66%)');

  t.is(c.desaturate(0.4).tohsl(), 'hsl(3, 49%, 66%)');
  t.is(c.desaturate(0.7).tohsl(), 'hsl(3, 24%, 66%)');
});

test('should lighten color', function(t) {
  var c = new Color('hsl(3, 83%, 66%)');

  t.is(c.lighten(0.4).tohsl(), 'hsl(3, 83%, 92%)');
  t.is(c.lighten(0.7).tohsl(), 'hsl(3, 83%, 112%)');
});

test('should darken color', function(t) {
  var c = new Color('hsl(3, 83%, 66%)');

  t.is(c.darken(0.4).tohsl(), 'hsl(3, 83%, 39%)');
  t.is(c.darken(0.7).tohsl(), 'hsl(3, 83%, 19%)');
});
