module.exports = {
  match: /^cmyk\s?\((\s?(\d+\.?(\d+)?)\s?,){3}\s?(\d+\.?(\d+)?)\s?/i,

  format: function(c) {
    var cmyk = c.replace(/[cmyk()]/g, '').split(',');

    return [
      parseInt(cmyk[0], 10),
      parseInt(cmyk[1], 10),
      parseInt(cmyk[2], 10),
      parseInt(cmyk[3], 10),
    ];
  },

  convert: function() {
    var c, m, y, k;

    c = 1 - (this.red / 255);
    m = 1 - (this.green / 255);
    y = 1 - (this.blue / 255);

    k = Math.min(Math.min(c, m), y);

    if (k === 1) {
      c = m = y = 0;
    } else {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }

    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100),
    ];
  },

  frommodel: function() {
    var c, m, y, k;

    c = this.cmyk[0] / 100;
    m = this.cmyk[1] / 100;
    y = this.cmyk[2] / 100;
    k = this.cmyk[3] / 100;

    c = (c * (1 - k) + k);
    m = (m * (1 - k) + k);
    y = (y * (1 - k) + k);

    return {
      red: Math.round((1 - c) * 255),
      green: Math.round((1 - m) * 255),
      blue: Math.round((1 - y) * 255),
    };
  },

  tomodel: function() {
    return 'cmyk(' + this.cmyk[0] + ', ' + this.cmyk[1] + ', ' + this.cmyk[2] + ', ' + this.cmyk[3] + ')';
  },
};
