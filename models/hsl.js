/* global Color */

module.exports = {
    match: /^hsla?\s?\(\s?(\d+\.?\d?)\s?,\s?(\d+\.?\d?)%?\s?,\s?(\d+\.?\d?)%?\s?/i,

    format: function(c) {
        var hsl = c.replace(/[hsla()]/g, "").split(",");

        this.alpha = hsl[3] ? parseFloat(hsl[3]) : 1;

        return [
            parseInt(hsl[0], 10),
            parseInt(hsl[1], 10),
            parseInt(hsl[2], 10)
        ];
    },

    convert: function() {
        var r = this.red / 255,
            g = this.green / 255,
            b = this.blue / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, l = (max + min) / 2,
            d = max - min;

        if (max === min) {
            h = s = 0;
        } else {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = ((g - b) / d) + (g < b ? 6 : 0);
                    break;
                case g:
                    h = ((b - r) / d) + 2;
                    break;
                case b:
                    h = ((r - g) / d) + 4;
                    break;
            }

            h /= 6;
        }

        return [
            Math.round(h * 360),
            Math.round(s * 100),
            Math.round(l * 100)
        ];
    },

    frommodel: function() {
        var h, s, l,
            r, g, b,
            p, q,
            hue2Rgb = function(p, q, t) {
                if (t < 0) {
                    t += 1;
                } else if (t > 1) {
                    t -= 1;
                }

                if (t < (1 / 6)) {
                    return p + ((q - p) * 6 * t);
                }

                if (t < (1 / 2)) {
                    return q;
                }

                if (t < (2 / 3)) {
                    return p + ((q - p) * ((2 / 3) - t) * 6);
                }

                return p;
            };

        h = this.hsl[0] / 360;
        s = this.hsl[1] / 100;
        l = this.hsl[2] / 100;

        if (s === 0) {
            r = g = b = l;
        } else {
            q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            p = 2 * l - q;

            r = hue2Rgb(p, q, h + 1 / 3);
            g = hue2Rgb(p, q, h);
            b = hue2Rgb(p, q, h - 1 / 3);
        }

        return {
            red: Math.round(r * 255),
            green: Math.round(g * 255),
            blue: Math.round(b * 255),
            alpha: this.alpha
        };
    },

    tomodel: function() {
        return "hsl(" + this.hsl[0] + ", " + this.hsl[1] + "%, " + this.hsl[2] + "%)";
    },

    tohsla: function() {
        return "hsla(" + this.hsl[0] + ", " + this.hsl[1] + "%, " + this.hsl[2] + "%, " + this.alpha + ")";
    },

    rotate: function(degrees) {
        var hsl = this.hsl.slice(0);

        hsl[0] = (hsl[0] + degrees) % 360;
        hsl[0] = hsl[0] < 0 ? 360 + hsl[0] : hsl[0];

        return new Color(this.tohsl.call({
            hsl: hsl,
            alpha: this.alpha
        }));
    },

    saturate: function(ratio) {
        var hsl = this.hsl.slice(0);

        hsl[1] += hsl[1] * Math.max(Math.min(ratio, 1), 0);

        return new Color(this.tohsl.call({
            hsl: hsl,
            alpha: this.alpha
        }));
    },

    desaturate: function(ratio) {
        var hsl = this.hsl.slice(0);

        hsl[1] -= hsl[1] * Math.max(Math.min(ratio, 1), 0);

        return new Color(this.tohsl.call({
            hsl: hsl,
            alpha: this.alpha
        }));
    },

    lighten: function(ratio) {
        var hsl = this.hsl.slice(0);

        hsl[2] += hsl[2] * Math.max(Math.min(ratio, 1), 0);

        return new Color(this.tohsl.call({
            hsl: hsl,
            alpha: this.alpha
        }));
    },

    darken: function(ratio) {
        var hsl = this.hsl.slice(0);

        hsl[2] -= hsl[2] * Math.max(Math.min(ratio, 1), 0);

        return new Color(this.tohsl.call({
            hsl: hsl,
            alpha: this.alpha
        }));
    }
};
