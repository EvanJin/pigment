module.exports = {
    match: /^hwba?\s?\(\s?(\d+\.?(\d+)?)\s?,\s?(\d+\.?(\d+)?)%?\s?,\s?(\d+\.?(\d+)?)%?\s?/i,

    format: function(c) {
        var hwb = c.replace(/[hwba()]/g, "").split(",");

        this.alpha = hwb[3] ? parseFloat(hwb[3]) : 1;

        return [
            parseInt(hwb[0], 10),
            parseInt(hwb[1], 10),
            parseInt(hwb[2], 10)
        ];
    },

    convert: function() {
        var r = this.red / 255,
            g = this.green / 255,
            b = this.blue / 255,
            w = Math.min(r, g, b),
            v = Math.max(r, g, b),
            br = 1 - v,
            h, f, i;

        if (v === w) {
            return [ 0, w, br ];
        }

        f = r === w ? g - b : (g === w ? b - r : r - g);
        i = r === w ? 3 : (g === w ? 5 : 1);
        h = (i - f / (v - w)) / 6;

        return [
            Math.round(h * 360),
            Math.round(w * 100),
            Math.round(br * 100)
        ];
    },

    frommodel: function() {
        var h = this.hwb[0] / 360,
            wh = this.hwb[1] / 100,
            bl = this.hwb[2] / 100,
            ratio = wh + bl,
            i, v, f, n,
            r, g, b;

        if (ratio > 1) {
            wh /= ratio;
            bl /= ratio;
        }

        i = Math.floor(6 * h);
        v = 1 - bl;
        f = 6 * h - i;

        if ((i & 0x01) !== 0) {
            f = 1 - f;
        }

        n = wh + f * (v - wh); // linear interpolation

        switch (i) {
        default:
        case 0:
        case 6:
            r = v;
            g = n;
            b = wh;

            break;
        case 1:
            r = n;
            g = v;
            b = wh;

            break;
        case 2:
            r = wh;
            g = v;
            b = n;

            break;
        case 3:
            r = wh;
            g = n;
            b = v;

            break;
        case 4:
            r = n;
            g = wh;
            b = v;

            break;
        case 5:
            r = v;
            g = wh;
            b = n;

            break;
        }

        return {
            red: Math.round(r * 255),
            green: Math.round(g * 255),
            blue: Math.round(b * 255),
            alpha: this.alpha
        };
    },

    tomodel: function() {
        return "hwb(" + this.hwb[0] + ", " + this.hwb[1] + "%, " + this.hwb[2] + "%)";
    },

    tohwba: function() {
        return "hwba(" + this.hwb[0] + ", " + this.hwb[1] + "%, " + this.hwb[2] + "%, " + this.alpha + ")";
    }
};
