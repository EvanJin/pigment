module.exports = {
    match: /^xyza?\s?\((\s?(\d+\.?\d?)\s?,){2}\s?(\d+\.?\d?)\s?/i,

    format: function(c) {
        var xyz = c.replace(/[xyza()]/g, "").split(",");

        this.alpha = xyz[3] ? parseFloat(xyz[3]) : 1;

        return [
            parseInt(xyz[0], 10),
            parseInt(xyz[1], 10),
            parseInt(xyz[2], 10)
        ];
    },

    convert: function() {
        var rgb = [
                this.red / 255,
                this.green / 255,
                this.blue / 255
            ];

        for (var i = 0, l = rgb.length; i < l; i++) {
            if (rgb[i] > 0.04045) {
                rgb[i] = Math.pow(((rgb[i] + 0.055) / 1.055), 2.4);
            } else {
                rgb[i] /= 12.92;
            }

            rgb[i] = rgb[i] * 100;
        }

        return [
            Math.round(rgb[0] * 0.412453 + rgb[1] * 0.357580 + rgb[2] * 0.180423),
            Math.round(rgb[0] * 0.212671 + rgb[1] * 0.715160 + rgb[2] * 0.072169),
            Math.round(rgb[0] * 0.019334 + rgb[1] * 0.119193 + rgb[2] * 0.950227)
        ];
    },

    frommodel: function() {
        var x, y, z, rgb = [];

        x = this.xyz[0] / 100;
        y = this.xyz[1] / 100;
        z = this.xyz[2] / 100;

        rgb[0] = (x * 3.240479) + (y * -1.537150) + (z * -0.498535);
        rgb[1] = (x * -0.969256) + (y * 1.875992) + (z * 0.041556);
        rgb[2] = (x * 0.055648) + (y * -0.204043) + (z * 1.057311);

        for (var i = 0, l = rgb.length; i < l; i++) {
            if (rgb[i] < 0) {
                rgb[i] = 0;
            }

            if (rgb[i] > 0.0031308) {
                rgb[i] = 1.055 * Math.pow(rgb[i], (1 / 2.4)) - 0.055;
            } else {
                rgb[i] *= 12.92;
            }

            rgb[i] = Math.round(rgb[i] * 255);
        }

        return {
            red: rgb[0],
            green: rgb[1],
            blue: rgb[2],
            alpha: this.alpha
        };
    },

    tomodel: function() {
        return "xyza(" + this.xyz[0] + ", " + this.xyz[1] + ", " + this.xyz[2] + ", " + this.alpha + ")";
    }
};
