var Color = require('../core.js');

module.exports = {
  match: /^rgba?\s?\((\s?(\d+)\s?,){2}\s?(\d+)\s?/i,

  format: function(c) {
    var rgb = c.replace(/[rgba()]/g, '').split(',');

    this.alpha = rgb[3] ? parseFloat(rgb[3]) : 1;

    return [
      parseInt(rgb[0], 10),
      parseInt(rgb[1], 10),
      parseInt(rgb[2], 10),
    ];
  },

  convert: function() {
    return [
      this.red,
      this.green,
      this.blue,
      this.alpha,
    ];
  },

  frommodel: function() {
    return {
      red: this.rgb[0],
      green: this.rgb[1],
      blue: this.rgb[2],
      alpha: this.alpha,
    };
  },

  tomodel: function() {
    return 'rgb(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ')';
  },

  torgba: function() {
    return 'rgba(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ', ' + this.alpha + ')';
  },

  luminance: function() {
    var lum = [],
      chan;

    for (var i = 0, l = this.rgb.length; i < l; i++) {
      chan = this.rgb[i] / 255;

      lum[i] = (chan <= 0.03928) ? (chan / 12.92) : Math.pow(((chan + 0.055) / 1.055), 2.4);
    }

    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  },

  darkness: function() {
    var yiq = (this.rgb[0] * 299 + this.rgb[1] * 587 + this.rgb[2] * 114) / 1000;

    return 1 - (yiq / 255);
  },

  negate: function() {
    return new Color({
      red: 255 - this.rgb[0],
      green: 255 - this.rgb[1],
      blue: 255 - this.rgb[2],
      alpha: this.alpha,
    });
  },

  greyscale: function() {
    var y = this.rgb[0] * 0.299 + this.rgb[1] * 0.587 + this.rgb[2] * 0.114;

    return new Color({
      red: y,
      green: y,
      blue: y,
      alpha: this.alpha,
    });
  },

  grayscale: function() {
    return this.greyscale();
  },

  mix: function(add, weight) {
    var c = new Color(add),
      t1, d, weight1, weight2,
      rgb = [];

    weight = 1 - (weight <= 1 ? weight : 0.5);

    t1 = (weight * 2) - 1;
    d = this.alpha - c.alpha;

    weight1 = (((t1 * d === -1) ? t1 : (t1 + d) / (1 + t1 * d)) + 1) / 2;
    weight2 = 1 - weight1;

    for (var i = 0, l = this.rgb.length; i < l; i++) {
      rgb.push(Math.round(this.rgb[i] * weight1 + c.rgb[i] * weight2));
    }

    return new Color({
      red: rgb[0],
      green: rgb[1],
      blue: rgb[2],
      alpha: this.alpha * weight + c.alpha * (1 - weight),
    });
  },

  fadein: function(ratio) {
    var alpha = this.alpha;

    alpha += alpha * Math.max(Math.min(ratio, 1), 0);

    return new Color({
      red: this.rgb[0],
      green: this.rgb[1],
      blue: this.rgb[2],
      alpha: alpha,
    });
  },

  fadeout: function(ratio) {
    var alpha = this.alpha;

    alpha -= alpha * Math.max(Math.min(ratio, 1), 0);

    return new Color({
      red: this.rgb[0],
      green: this.rgb[1],
      blue: this.rgb[2],
      alpha: alpha,
    });
  },
};
