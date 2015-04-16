module.exports = {
    match: /^cmyk\s?\((\s?(\d+)\s?,){3}\s?(\d+)\s?/i,

    init: function() {
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

        this.cmyk = [
            Math.round(c * 100),
            Math.round(m * 100),
            Math.round(y * 100),
            Math.round(k * 100)
        ];
    },

    frommodel: function(color) {
        var cmyk, c, m, y, k;

        cmyk = color.replace(/[cmyk()]/g, "").split(",");

        c = parseInt(cmyk[0], 10) / 100;
        m = parseInt(cmyk[1], 10) / 100;
        y = parseInt(cmyk[2], 10) / 100;
        k = parseInt(cmyk[3], 10) / 100;

        c = (c * (1 - k) + k);
        m = (m * (1 - k) + k);
        y = (y * (1 - k) + k);

        return {
            red: Math.round((1 - c) * 255),
            green: Math.round((1 - m) * 255),
            blue: Math.round((1 - y) * 255)
        };
    },

    tomodel: function() {
        return "cmyk(" + this.cmyk[0] + ", " + this.cmyk[1] + ", " + this.cmyk[2] + ", " + this.cmyk[3] + ")";
    }
};
