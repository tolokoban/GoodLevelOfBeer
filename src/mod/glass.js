"use strict";
var Widget = require("wdg");

/**
 * @example
 * var Glass = require("glass");
 * var instance = new Glass(size, content, target);
 * @class Glass
 */
var Glass = function(size, content, target) {
    Widget.call(this);
    this.addClass("glass");
    var arcs = [];
    var k;
    for (k=0; k <= size; k++) {
        arcs.push(arc(300, 0, 150, 50));
    }
    this._arcs = arcs;
    var svg = Widget.svg({
        preserveAspectRatio: 'xMidYMid',
        width: "100%",
        height: "100%",
        viewBox: "-50 -50 400 600"
    });
    svg.append(
        // Face arrière du verre.
        Widget.svg('path', {
            fill: 'rgba(0,0,255,.4)',
            stroke: "none",
            d: 'M0,' + (475 - size * 50) + arc(300,0, 150,-50) + 'v' + (size * 50)
                + arc(-300,0, -150,50) + 'z'
        }),
        // Trait noir pour le haut du verre.
        Widget.svg('path', {
            fill: 'none',
            stroke: "#000",
            'stroke-width': 20,
            d: 'M0,' + (475 - size * 50) + arc(300,0, 150,-50)
        })
    );
    this._liquid = Widget.svg(
        'g',
        {
            stroke: 'none',
            fill: '#ff0'
        }
    );
    svg.append(
        this._liquid,
        // Dessin de la face avant du verre.
        Widget.svg('path', {
            fill: 'rgba(0,0,255,.1)',
            stroke: "#000",
            'stroke-width': 20,
            d: 'M-25,475' + arc(350, 0, 150, 50) + 'h-25'
                + line(0, -size * 50)
                + arc(-300, 0, -150, 50)
                + line(0, size * 50) + 'h-25'
        }),
        // Ombre sur le bas-droit du verre.
        Widget.svg('path', {
            fill: '#321',
            opacity: .2,
            stroke: 'none',
            d: 'M0,475' + arc(300, -size * 50, 200, -size * 15)
                + 'v' + (size * 50)
                + arc(-300,0, -150,50)
        })
    );
    // Graduations.
    for (k=0; k <= size; k++) {
        svg.append(Widget.svg('path', {
            fill: 'none',
            stroke: target == k ? 'red' : "#000",
            'stroke-width': target == k ? 8 : (k % 3 == 0 ? 4 : 1),
            d: 'M0,' + (475 - 50 * k) + arcs[k]
        }));
    }
    this.append(svg);

    this.content(content);
};


function noise(v, radius) {
    if (typeof radius === 'undefined') radius = 30;

    return v + Math.floor(Math.random() * radius - radius / 2);
}

/**
 * Return the  code of a  bezier curve  that imitates a  straight line
 * drawn by hand from (0,0) to (vx,vy)
 */
function line(vx, vy, radius) {
    if (typeof radius === 'undefined') radius = 30;
    return "c" + noise(vx / 3, radius) + ',' + noise(vy / 3, radius)
        + ',' + noise(2 * vx / 3, radius) + ',' + noise(2 * vy / 3, radius)
        + ',' + vx + ',' + vy;
}

/**
 * This function  assumes that we  want to draw  an arc from  (0,0) to
 * (x,y) passing near the point (cx,cy).
 */
function arc(x, y, cx, cy, radius) {
    var vx = cx - x / 2;
    var vy = cy - y / 2;
    var x1 = vx;
    var y1 = vy;
    var x2 = x + vx;
    var y2 = y + vy;
    return 'c' + noise(x1, radius) + ',' + noise(y1, radius)
        + ',' + noise(x2, radius) + ',' + noise(y2, radius)
        + ',' + x + ',' + y;
}

// Extension of Widget.
Glass.prototype = Object.create(Widget.prototype);
Glass.prototype.constructor = Glass;

/**
 * @return void
 */
Glass.prototype.content = function(v) {
    this._liquid.clear(
        Widget.svg('path', {
            'd': 'M300,475'
                + arc(-300,0, -150,50)
                + 'v-' + (v * 50)
                + this._arcs[v] + 'Z'
        })
    );
};



Glass.create = function(size, content, target) {
    return new Glass(size, content, target);
};
module.exports = Glass;
