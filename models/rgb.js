/* global Color */

module.exports = {
    match: /^rgba?\s?\((\s?(\d+)\s?,){2}\s?(\d+)\s?/i,

    init: function() {
        this.rgb = [ this.red, this.green, this.blue ];
    },

    frommodel: function(c) {
        var rgb = c.replace(/[rgba()]/g, "").split(",");

        return {
            red: parseInt(rgb[0], 10),
            green: parseInt(rgb[1], 10),
            blue: parseInt(rgb[2], 10),
            alpha: rgb[3] ? parseFloat(rgb[3]) : 1
        };
    },

    tomodel: function() {
        return "rgba(" + this.rgb[0] + ", " + this.rgb[1] + ", " + this.rgb[2] + ", " + this.alpha + ")";
    },

    filter: function(matrix) {
        var c = {
                r: this.rgb[0],
                g: this.rgb[1],
                b: this.rgb[2],
                a: this.alpha
            },
            m = matrix,
            r, g, b, a,
            fu = function(n) {
                return (n < 0 ? 0 : (n < 255 ? n : 255 ));
            };

        r = ((c.r * m[0]) + (c.g * m[1]) + (c.b * m[2]) + (c.a * m[3]) + m[4]);
        g = ((c.r * m[5]) + (c.g * m[6]) + (c.b * m[7]) + (c.a * m[8]) + m[9]);
        b = ((c.r * m[10]) + (c.g * m[11]) + (c.b * m[12]) + (c.a * m[13]) + m[14]);
        a = ((c.r * m[15]) + (c.g * m[16]) + (c.b * m[17]) + (c.a * m[18]) + m[19]);

        return new Color({
            red: fu(r),
            green: fu(g),
            blue: fu(b),
            alpha: fu(a)
        });
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
            alpha: this.alpha
        });
    },

    greyscale: function() {
        return new Color({
            red: this.rgb[0] * 0.3,
            green: this.rgb[1] * 0.59,
            blue: this.rgb[2] * 0.11,
            alpha: this.alpha
        });
    },

    mix: function(add, weight) {
        var c = new Color(add),
            t1, d, weight1, weight2,
            rgb = [];

        weight = 1 - (weight ? weight : 0.5);

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
            alpha: this.alpha * weight + c.alpha * (1 - weight)
        });
    },

    fadein: function(ratio) {
        var alpha = this.alpha;

        alpha += alpha * Math.max(Math.min(ratio, 1), 0);

        return new Color({
            red: this.rgb[0],
            green: this.rgb[1],
            blue: this.rgb[2],
            alpha: alpha
        });
    },

    fadeout: function(ratio) {
        var alpha = this.alpha;

        alpha -= alpha * Math.max(Math.min(ratio, 1), 0);

        return new Color({
            red: this.rgb[0],
            green: this.rgb[1],
            blue: this.rgb[2],
            alpha: alpha
        });
    }
};
