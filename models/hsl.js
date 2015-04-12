module.exports = {
    match: /^hsla?\s?\(\s?(\d+)\s?,\s?(\d+)[%]?\s?,\s?(\d+)[%]?\s?/i,

    init: function() {
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

        this.hsl = [ h, s, l ];
    },

    frommodel: function(c) {
        var hsl, alpha,
            h, s, l,
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

        hsl = c.replace(/[hsla()]/g, "").split(",");

        h = hsl[0] / 360;
        s = hsl[1] / 100;
        l = hsl[2] / 100;

        alpha = hsl[3] ? parseFloat(hsl[3]) : 1;

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
            alpha: alpha
        };
    },

    tomodel: function() {
        return "hsla(" +
                     Math.round(this.hsl[0] * 360) + ", " +
                     Math.round(this.hsl[1] * 100) + "%, " +
                     Math.round(this.hsl[2] * 100) + "%, " +
                     this.alpha +
                     ")";
    }
};
