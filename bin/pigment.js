#!/usr/bin/env node

"use strict";

var pack = require("../package.json"),
    Color = require("../full");

// First argument should be the color string
var color = process.argv[2],
    args = process.argv.slice(3),
    ops = [], curr, prev, next;

function isArg(val) {
    return /^--.+$/.test(val);
}

function isNumber(val) {
    return /^(\d+|(\d*\.\d+))+$/.test(val);
}

if (!color) {
    process.stderr.write("No color specified!\n");
    process.exit(1);
}

if (color.indexOf("-") === 0) {
    switch (color) {
    case "-h":
    case "--help":
        process.stdout.write(pack.description + ".\n\n");
        process.stdout.write("Usage: pigment [COLOR]... [OPTIONS]...\n\n");
        process.stdout.write("e.g. - pigment '#f06860' --rotate 45 --mix '#e9f060' .5 --lighten .3 --tohex\n\n");
        process.stdout.write("Refer the API documentation for all available options.\n");
        process.stdout.write("http://npmjs.com/package/pigment\n");
        break;
    case "-v":
    case "--version":
        process.stdout.write(pack.version + "\n");
        break;
    default:
        process.stdout.write("Invalid parameters passed. See '--help' for usage.\n");
        process.exit(1);
    }

    process.exit(0);
}

if (args.length === 0) {
    process.stderr.write("Nothing to do!\n");
    process.exit(1);
}

// Create a list of operations to do on the color
for (var i = 0, l = args.length; i < l; i++) {
    curr = args[i];
    prev = args[i - 1];
    next = args[i + 1];

    if (isArg(curr)) {
        ops.push({
            fn: curr.replace(/^--/, ""),
            params: next && !isArg(next) ? [ isNumber(next) ? parseFloat(next, 10) : next ] : []
        });
    } else if (!isArg(prev)) {
        ops[ops.length - 1].params.push(isNumber(curr) ? parseFloat(curr, 10) : curr);
    }
}

// Run the color operations
ops.forEach(function(op) {
    if (typeof color === "string") {
        // Try to create a new color object
        try {
            color = new Color(color);
        } catch(e) {
            process.stderr.write(e.message + "\n");
            process.exit(1);
        }
    }

    if (typeof color[op.fn] === "function") {
        color = color[op.fn].apply(color, op.params);
    } else {
        process.stderr.write("No such option --" + op.fn + "!\n");
        process.exit(1);
    }
});

if (typeof color !== "string") {
    color = color.torgba();
}

process.stdout.write(color + "\n");

process.exit(0);
