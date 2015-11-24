"use strict";
var Widget = require("wdg");
var Svg = Widget.svg;


var ID = 0;


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
    // Unique ID to prevent using the clipPath of another glass.
    this._id = ID++;
    // Taille du viewbox.
    this._width = 600;
    this._height = 600;
    // Largeur du verre : 300
    this._glassW = 300;
    // Hauteur du verre : size * 50
    this._glassH = 50 * size;
    // Point inférieur gauche du verre : (150, 550)
    this._glassX = (this._width - this._glassW) / 2;
    this._glassY = this._height - (this._height - 50 * 9) / 2;

    version2.call(this);
    this.content(content);
};


function version2() {
    var svg = Svg({
        preserveAspectRatio: 'xMidYMid',
        width: "100%",
        height: "100%",
        viewBox: "0 0 600 600"
    });

    svg.append(createClipPathForContent.call(this));

    var leftCornerV = noise(25,20),
    leftCornerH = noise(50,50),
    rightCornerV = noise(25,20),
    rightCornerH = noise(50,50);

    var shape = {};
    shape.base = "M" + this._glassX + "," + (this._glassY - this._glassH)
        + line(0, this._glassH - leftCornerV)
        + arc(leftCornerH, leftCornerV, 0, leftCornerV, 5)
        + line(this._glassW - leftCornerH - rightCornerH, 0, 5)
        + arc(rightCornerH, -rightCornerV, rightCornerH, 0, 5);
    shape.shadow = shape.base + arc(-this._glassW, -this._glassH + rightCornerH, -this._glassW, 0);
    shape.base += line(0, - this._glassH + rightCornerV, 5);

    var background = Svg('g', {
        stroke: "none", fill: "#3df", opacity: .5
    }).append(
        Svg('path', {d: shape.base})
    );

    var liquid = Svg('g', {'clip-path': 'url(#content' + this._id + ')'}).append(
        Svg('path', {
            d: shape.base, fill: "yellow", stroke: "none"
        })
    );

    var glass = Svg('g', {
        stroke: "#003", "stroke-width": "10", fill: "none"
    }).append(
        Svg('path', {d: shape.base})
    );

    var rule = createRule.call(this);

    var bar = Svg('g', {
        stroke: "#003", "stroke-width": "10", fill: "rgba(0,50,150,0.2)"
    }).append(
        Svg('path', {
            d: "M" + (this._glassX + 20 + this._glassW * .25) + "," + (this._glassY - 40)
                + arc(-40, 0, -20, 40, 5)
                + line(0, 100 - this._glassH, 5)
                + arc(40, 0, 20, -40, 5)
        }),
        Svg('path', {
            d: "M" + (this._glassX + 20 + this._glassW * .5) + "," + (this._glassY - 40)
                + arc(-40, 0, -20, 40, 5)
                + line(0, 100 - this._glassH, 5)
                + arc(40, 0, 20, -40, 5)
        }),
        Svg('path', {
            d: "M" + (this._glassX + 20 + this._glassW * .75) + "," + (this._glassY - 40)
                + arc(-40, 0, -20, 40, 5)
                + line(0, 100 - this._glassH, 5)
                + arc(40, 0, 20, -40, 5)
        })
    );

    svg.append(
        rule, background, liquid, glass,
        Svg('path', {d: shape.shadow, stroke: "none", fill: "#000", opacity: .2}),
        bar
    );
    var handle = createHandle.call(this);
    if (handle) svg.append(handle);
    this.clear(svg);
}


function createClipPathForContent() {
    var defs = Svg('defs');
    var clipPath = Svg('clipPath', {id: "content" + this._id});
    this._clipPath = clipPath;
    defs.append(clipPath);
    return defs;
}


function createHandle() {
    if (this._size < 5) return Svg('g');
    var thickness = 40;
    var w;
    var x = this._glassX + this._glassW - thickness * .3;
    var y1ext = this._glassY - this._glassH + rnd(50, 150);
    var y1int = y1ext + thickness;
    var h = rnd(150, y1ext - this._glassY - 50);
    if (Math.random() > .3) {
        // Half handle.
        w = rnd(50, 100);
        var shift = rnd(-thickness, w);        
        return Svg('path', {
            fill: "rgba(51, 221, 255, .5)", stroke: "#000", "stroke-width": "10",
            d: "M" + x + "," + y1ext
                + line(w, 0, 5)
                + arc(thickness, thickness, thickness, 0, 5)
                + line(-shift, h, 5)
                + arc(-thickness, 0, -thickness/2, thickness, 5)
                + line(shift, -h + thickness/2, 5)
                + arc(-thickness/2, -thickness/2, 0, -thickness/2)
                + line(-w + thickness/2, 0, 5)
                + arc(0, -thickness, -thickness, -thickness/2, 5)
        });
    } else {
        // Full handle.
        w = rnd(100, 150);
        return Svg('path', {
            fill: "rgba(51, 221, 255, .5)", stroke: "#000", "stroke-width": "10",
            d: "M" + x + "," + y1ext
                + arc(0, h, w, h/2)
                + arc(0, -thickness, -thickness, -thickness/2, 5)
                + arc(0, -h + 2 * thickness, w - 2 * thickness, -(h - 2 * thickness)/2)
                + arc(0, -thickness, -thickness, -thickness/2, 5)
        });
    }
}

function createRule() {
    var g = Svg('g', {
        "stroke-width": 3,
        stroke: "#000"
    });
    var y = this._glassY, x1 = this._glassX - 60, x2 = x1 + 30;
    g.append(Svg('rect', {
        fill: "#fff", opacity: .5, stroke: "none",
        x: x1 - 65, y: this._glassY - this._glassH - 25,
        width: 120, height: this._glassH + 50
    }));
    g.append(Svg('path', {
        fill: "red", stroke: "none",
        d: 'M' + (x2 - 25) + "," + (y - 50 * this._target) + "l-30,-30,75,30,-75,30,Z"
    }));
    for (var i = 0 ; i <= this._size ; i++) {
        if (i % 3) {
            g.append(Svg('line', {x1: x1, y1: y, x2: x2, y2: y}));
        } else {
            g.append(Svg('line', {x1: x1 - 10, y1: y, x2: x2 + 10, y2: y, "stroke-width": 6}));
            if (i > 0) {
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


function rnd(a, b) {
    if (typeof b === 'undefined') {
        b = a;
        a = 0;
    }
    return a + Math.random(b - a);
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
    this._clipPath.clear(
        Svg('path',
            {d: "M" + (this._glassX - 50) + "," + (this._glassY + 50)
             + "v" + (- 50 - 50 * this._content)
             + line(100 + this._glassW, 0)
             + "v" + (50 + 50 * this._content)}));
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
