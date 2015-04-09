module.exports = {
    match: /^#([0-9a-f]{3}){1,2}$/i,
    tocolor: function(c) {
        var hex;

        if (c.length === 4) {
            c = c.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
                return "#" + r + r + g + g + b + b;
            });
        }

        hex = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(c);

        return {
            red: parseInt(hex[1], 16),
            green: parseInt(hex[2], 16),
            blue: parseInt(hex[3], 16)
        };
    },
    fromcolor: function() {
        var r = ("0" + parseInt(this.red, 10).toString(16)).slice(-2),
            g = ("0" + parseInt(this.green, 10).toString(16)).slice(-2),
            b = ("0" + parseInt(this.blue, 10).toString(16)).slice(-2);

        return "#" + r + g + b;
    }
};
