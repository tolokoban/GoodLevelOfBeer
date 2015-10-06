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
    var svg = Widget.svg({
        preserveAspectRatio: 'xMidYMid',
        width: "100%",
        height: "100%",
        viewBox: "-10 -10 320 520"
    });
    svg.append(
        Widget.svg('path', {
            fill: 'rgb(150,150,200)',
            stroke: "#000",
            'stroke-width': 8,
            d: 'M0,475c0,30,300,30,300,0v-' + (size * 50)
                + 'c0,-30,-300,-30,-300,0Z'
        }),
        Widget.svg('path', {
            fill: 'none',
            stroke: "#000",
            'stroke-width': 4,
            d: 'M0,475c0,-30,300,-30,300,0'
        })
    );
    this._liquid = Widget.svg(
        'path',
        {
            stroke: 'none',
            fill: '#fd0'
        }
    );
    svg.append(
        this._liquid,
        Widget.svg('path', {
            fill: 'rgb(255,255,255)',
            opacity: .3,
            stroke: "none",
            d: 'M0,475c0,30,300,30,300,0v-' + (size * 50)
                + 'c0,30,-300,30,-300,0Z'
        }),
        Widget.svg('path', {
            fill: 'none',
            stroke: "#000",
            'stroke-width': 8,
            d: 'M0,475c0,30,300,30,300,0v-' + (size * 50)
                + 'c0,30,-300,30,-300,0Z'
        })
    );
    for (var k=0; k <= size; k++) {
        svg.append(Widget.svg('path', {
            fill: 'none',
            stroke: target == k ? 'red' : "#000",
            'stroke-width': target == k ? 8 : 1,
            d: 'M0,' + (475 - 50 * k) + 'c0,30,300,30,300,0'
        }));
    }
    this.append(svg);

    this.content(content);
};

// Extension of Widget.
Glass.prototype = Object.create(Widget.prototype);
Glass.prototype.constructor = Glass;

/**
 * @return void
 */
Glass.prototype.content = function(v) {
    this._liquid.attr(
        'd', 'M0,475c0,30,300,30,300,0v-' + (v * 50)
                + 'c0,30,-300,30,-300,0Z'
    );
};



Glass.create = function(size, content, target) {
    return new Glass(size, content, target);
};
module.exports = Glass;
