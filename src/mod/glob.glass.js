"use strict";
var Widget = require("wdg");
var Svg = Widget.svg;


/**
 * @example
 * var Glass = require("glass");
 * var instance = new Glass(size, content, target);
 * @class Glass
 */
var Glass = function(size, content, target) {
    Widget.call(this);
    this.addClass("glass");
    this._size = size;
    this._content = content;
    this._target = target;
    version2.call(this);
    this.content(content);
};


function version2() {
    var size = this._size;
    var content = this._content;
    var target = this._target;
    // Largeur du verre : 300
    var glassW = 300;
    // Hauteur du verre : size * 50
    var glassH = 50 * size;
    // Point inférieur gauche du verre : (150, 550)
    var glassX = 150, glassY = 550;
    var svg = Svg({
        preserveAspectRatio: 'xMidYMid',
        width: "100%",
        height: "100%",
        viewBox: "0 0 600 600"
    });

    svg.append(createClipPathForContent.call(this, glassX, glassY, glassW, glassH));

    var leftCornerV = noise(25,20),
        leftCornerH = noise(50,50),
        rightCornerV = noise(25,20),
        rightCornerH = noise(50,50);

    var shape = {};
    shape.base = "M" + glassX + "," + (glassY - glassH)
        + line(0, glassH - leftCornerV)
        + arc(leftCornerH, leftCornerV, 0, leftCornerV)
        + line(glassW - leftCornerH - rightCornerH, 0)
        + arc(rightCornerH, -rightCornerV, rightCornerH, 0);
    shape.shadow = shape.base + arc(-glassW, -glassH + rightCornerH, -glassW, 0);
    shape.base += line(0, - glassH + rightCornerV, 5);

    var background = Svg('g', {
        stroke: "none", fill: "#3df", opacity: .1
    }).append(
        Svg('path', {d: shape.base})
    );

    var liquid = Svg('g', {'clip-path': 'url(#content)'}).append(
        Svg('path', {
            d: shape.base, fill: "yellow", stroke: "none"
        })
    );

    var glass = Svg('g', {
        stroke: "#003", "stroke-width": "10", fill: "none"
    }).append(
        Svg('path', {d: shape.base})
    );

    var rule = createRule(size, content, target, glassX, glassY, glassW, glassH);

    var bar = Svg('g', {
        stroke: "#003", "stroke-width": "10", fill: "rgba(0,0,100,0.1)"
    }).append(
        Svg('path', {
            d: "M" + (glassX + 20 + glassW * .25) + "," + (glassY - 40)
                + arc(-40, 0, -20, 40, 5)
                + line(0, 100 - glassH, 5)
                + arc(40, 0, 20, -40, 5)
        }),
        Svg('path', {
            d: "M" + (glassX + 20 + glassW * .5) + "," + (glassY - 40)
                + arc(-40, 0, -20, 40, 5)
                + line(0, 100 - glassH, 5)
                + arc(40, 0, 20, -40, 5)
        }),
        Svg('path', {
            d: "M" + (glassX + 20 + glassW * .75) + "," + (glassY - 40)
                + arc(-40, 0, -20, 40, 5)
                + line(0, 100 - glassH, 5)
                + arc(40, 0, 20, -40, 5)
        })
    );

    svg.append(
        background, liquid, glass, rule,
        Svg('path', {d: shape.shadow, stroke: "none", fill: "#000", opacity: .2}),
        bar
    );
    this.clear(svg);
}


function createClipPathForContent(glassX, glassY, glassW, glassH) {
    return Svg('defs').append(
        Svg('clipPath', {id: 'content'}).append(
            Svg('rect', {x: 0, y: glassY - 50 * this._content, width: 10000, height: 10000})
        )
    );
}


function createRule(size, content, target, glassX, glassY, glassW, glassH) {
    var g = Svg('g', {
        "stroke-width": 3,
        stroke: "#000"
    });
    var y = glassY, x1 = glassX - 60, x2 = x1 + 30;
    g.append(Svg('path', {
        fill: "red", stroke: "none",
        d: 'M' + x2 + "," + (y - 50 * target) + "l-20,-20,50,20,-50,20,Z"
    }));
    for (var i = 0 ; i <= size ; i++) {
        if (i % 3) {
            g.append(Svg('line', {x1: x1, y1: y, x2: x2, y2: y, "stroke-width": 6, stroke: "#fff"}));
            g.append(Svg('line', {x1: x1, y1: y, x2: x2, y2: y}));
        } else {
            g.append(Svg('line', {x1: x1 - 10, y1: y, x2: x2 + 10, y2: y, "stroke-width": 12, stroke: "#fff"}));
            g.append(Svg('line', {x1: x1 - 10, y1: y, x2: x2 + 10, y2: y, "stroke-width": 6}));
            if (i > 0) {
                g.append(Svg('text', {
                    x: x1 - 25,
                    y: y + 25,
                    stroke: "#fff",
                    "stroke-width": 10,
                    fill: "#fff",
                    "text-anchor": "end",
                    "font-size": 60
                }).text(i));
                g.append(Svg('text', {
                    x: x1 - 25,
                    y: y + 25,
                    stroke: "none",
                    fill: "#000",
                    "text-anchor": "end",
                    "font-size": 60
                }).text(i));
            }
        }
        y -= 50;
    }
    return g;
}


function version1(size, content, target) {
    var arcs = [];
    var k;
    for (k=0; k <= size; k++) {
        arcs.push(arc(300, 0, 150, 50));
    }
    this._arcs = arcs;
    var svg = Svg({
        preserveAspectRatio: 'xMidYMid',
        width: "100%",
        height: "100%",
        viewBox: "-50 -50 400 600"
    });
    svg.append(
        // Face arrière du verre.
        Svg('path', {
            fill: 'rgba(0,0,255,.4)',
            stroke: "none",
            d: 'M0,' + (475 - size * 50) + arc(300,0, 150,-50) + 'v' + (size * 50)
                + arc(-300,0, -150,50) + 'z'
        }),
        // Trait noir pour le haut du verre.
        Svg('path', {
            fill: 'none',
            stroke: "#000",
            'stroke-width': 20,
            d: 'M0,' + (475 - size * 50) + arc(300,0, 150,-50)
        })
    );
    this._liquid = Svg(
        'g',
        {
            stroke: 'none',
            fill: '#ff0'
        }
    );
    svg.append(
        this._liquid,
        // Dessin de la face avant du verre.
        Svg('path', {
            fill: 'rgba(0,0,255,.1)',
            stroke: "#000",
            'stroke-width': 20,
            d: 'M-25,475' + arc(350, 0, 150, 50) + 'h-25'
                + line(0, -size * 50)
                + arc(-300, 0, -150, 50)
                + line(0, size * 50) + 'h-25'
        }),
        // Ombre sur le bas-droit du verre.
        Svg('path', {
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
        svg.append(Svg('path', {
            fill: 'none',
            stroke: target == k ? 'red' : "#000",
            'stroke-width': target == k ? 8 : (k % 3 == 0 ? 4 : 1),
            d: 'M0,' + (475 - 50 * k) + arcs[k]
        }));
    }
    this.append(svg);
};


function noise(v, radius) {
    if (typeof radius === 'undefined') radius = 15;

    return v + Math.floor(Math.random() * radius * 2 - radius);
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
    if (typeof radius === 'undefined') radius = 0;
    if (typeof cx === 'undefined') cx = noise(x, radius);
    if (typeof cy === 'undefined') cy = noise(y, radius);

    var courbure = .5;
    var x1 = cx * courbure;
    var y1 = cy * courbure;
    var x2 = x + (cx - x) * courbure;
    var y2 = y + (cy - y) * courbure;
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
    console.log("content " + this._content + " -> " + v);
    this._content = v;
    version2.call(this);
    /*
     this._liquid.clear(
     Svg('path', {
     'd': 'M300,475'
     + arc(-300,0, -150,50)
     + 'v-' + (v * 50)
     + this._arcs[v] + 'Z'
     })
     );
     */
};



Glass.create = function(size, content, target) {
    return new Glass(size, content, target);
};
module.exports = Glass;
