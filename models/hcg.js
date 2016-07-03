module.exports = {
  match: /^hcga?\s?\(\s?(\d+\.?(\d+)?)\s?,\s?(\d+\.?(\d+)?)%?\s?,\s?(\d+\.?(\d+)?)%?\s?/i,

  format: function(c) {
    var hcg = c.replace(/[hcga()]/g, '').split(',');

    this.alpha = hcg[3] ? parseFloat(hcg[3]) : 1;

    return [
      parseInt(hcg[0], 10),
      parseInt(hcg[1], 10),
      parseInt(hcg[2], 10),
    ];
  },

  convert: function() {
    var r = this.red / 255,
      g = this.green / 255,
      b = this.blue / 255,
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      c = (max - min), gr = 0,
      h = 0;
    if (c < 1) { gr = min / (1 - c); }
    if (c > 0) {
      switch (max) {
      case r: h = (g - b) / c + (g < b ? 6 : 0); break;
      case g: h = (b - r) / c + 2; break;
      case b: h = (r - g) / c + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(c * 100), Math.round(gr * 100)];
  },

  frommodel: function() {
    var h = this.hcg[0] / 360 * 6,
      c = this.hcg[1] / 100,
      gr = this.hcg[2] / 100;
    if (c === 0.0) {
      return {red: Math.round(gr * 255), green: Math.round(gr * 255), blue: Math.round(gr * 255), alpha: this.alpha};
    }
    var i = Math.floor(h),
      f = h - i,
      p = 0,
      q = c * (1 - f),
      t = c * f,
      mod = i % 6,
      r = [c, q, p, p, t, c][mod],
      g = [t, c, c, q, p, p][mod],
      b = [p, p, t, c, c, q][mod],
      d = (1 - c) * gr;
    return {
      red: Math.round((r + d) * 255),
      green: Math.round((g + d) * 255),
      blue: Math.round((b + d) * 255),
      alpha: this.alpha,
    };
  },

  tomodel: function() {
    return 'hcg(' + this.hcg[0] + ', ' + this.hcg[1] + '%, ' + this.hcg[2] + '%)';
  },

  tohcga: function() {
    return 'hcga(' + this.hcg[0] + ', ' + this.hcg[1] + '%, ' + this.hcg[2] + '%, ' + this.alpha + ')';
  },
};
