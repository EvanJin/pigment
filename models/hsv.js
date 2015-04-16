module.exports = {
    match: /^hsva?\s?\(\s?(\d+\.?\d?)\s?,\s?(\d+\.?\d?)%?\s?,\s?(\d+\.?\d?)%?\s?/i,

    init: function() {
        var r = this.red / 255,
            g = this.green / 255,
            b = this.blue / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, v = max,
            d = max - min;

        s = (max === 0) ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        this.hsv =  [
            Math.round(h * 360),
            Math.round(s * 100),
            Math.round(v * 100)
        ];
    },

    frommodel: function(c) {
        var hsv, alpha,
            h, s, v,
            r, g, b,
            i, f, t, p, q;

        hsv = c.replace(/[hsva()]/g, "").split(",");

        h = parseInt(hsv[0], 10) / 360;
        s = parseInt(hsv[1], 10) / 100;
        v = parseInt(hsv[2], 10) / 100;

        alpha = hsv[3] ? parseFloat(hsv[3]) : 1;

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6){
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return {
            red: Math.round(r * 255),
            green: Math.round(g * 255),
            blue: Math.round(b * 255),
            alpha: alpha
        };
    },

    tomodel: function() {
        return "hsva(" + this.hsv[0] + ", " + this.hsv[1] + "%, " + this.hsv[2] + "%, " + this.alpha + ")";
    }
};
