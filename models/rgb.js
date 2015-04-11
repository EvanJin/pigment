module.exports = {
    match: /^rgba?\s?\((\s?(\d+)\s?,){2}\s?(\d+)\s?/i,

    tocolor: function(c) {
        var rgb = c.replace(/[rgba()]/g, "").split(",");

        return {
            red: parseInt(rgb[0], 10),
            green: parseInt(rgb[1], 10),
            blue: parseInt(rgb[2], 10),
            alpha: rgb[3] ? parseFloat(rgb[3]) : 1
        };
    },

    fromcolor: function() {
        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    },

    filter: function(matrix) {
        var c = {
                r: this.red,
                g: this.green,
                b: this.blue,
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
        var props = [ "red", "green", "blue" ],
            lum = [],
            chan;

        for (var i = 0, l = props.length; i < l; i++) {
            chan = this[props[i]] / 255;

            lum[i] = (chan <= 0.03928) ? (chan / 12.92) : Math.pow(((chan + 0.055) / 1.055), 2.4);
        }

        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },

    darkness: function() {
        var yiq = (this.red * 299 + this.green * 587 + this.blue * 114) / 1000;

        return 1 - (yiq / 255);
    },

    negate: function() {
        return new Color({
            red: 255 - this.red,
            green: 255 - this.green,
            blue: 255 - this.blue,
            alpha: this.alpha
        });
    },

    greyscale: function() {
        return new Color({
            red: this.red * 0.3,
            green: this.green * 0.59,
            blue: this.blue * 0.11,
            alpha: this.alpha
        });
    },

    mix: function(add, weight) {
        var c = new Color(add),
            t1, d, weight1, weight2,
            props = [ "red", "green", "blue" ],
            obj = {};

        weight = 1 - (weight ? weight : 0.5);

        t1 = (weight * 2) - 1;
        d = this.alpha - c.alpha;

        weight1 = (((t1 * d === -1) ? t1 : (t1 + d) / (1 + t1 * d)) + 1) / 2;
        weight2 = 1 - weight1;

        for (var i = 0, l = props.length; i < l; i++) {
            obj[props[i]] = this[props[i]] * weight1 + c[props[i]] * weight2;
        }

        obj.alpha = this.alpha * weight + c.alpha * (1 - weight);

        return new Color(obj);
    },

    fadein: function(ratio) {
        var alpha = this.alpha;

        alpha += alpha * Math.max(Math.min(ratio, 1), 0);

        return new Color({
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: alpha
        });
    },

    fadeout: function(ratio) {
        var alpha = this.alpha;

        alpha -= alpha * Math.max(Math.min(ratio, 1), 0);

        return new Color({
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: alpha
        });
    }
};
