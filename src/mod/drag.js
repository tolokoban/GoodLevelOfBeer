"use strict";

/**
 * @example
 * var Drag = require("drag");
 * var instance = new Drag(element, {onstart: ..., ondrop: ..., ondrag: ...});
 * @class Drag
 */
var Drag = function(element, slots) {
  if (typeof slots === 'undefined') slots = {};
  this._element = element;
  var rect = element.getBoundingClientRect();
  var screen = null;
  element.addEventListener("pointerdown", function(evt) {
    screen = document.createElement("div");
    screen.className = "drag-screen";
    document.body.appendChild(screen);
    screen.addEventListener("pointerup", function(evt) {
      document.body.removeChild(screen);
      if (typeof slots.ondrop === 'function') {
        console.log(evt);
        slots.ondrop.call(element, {x: evt.pageX, y: evt.pageY});
      }
    });

console.log(rect, evt.pageX, evt.pageY, evt.clientX, evt.clientY);
    if (typeof slots.onstart === 'function') {
      slots.onstart.call(element, {x: evt.pageX, y: evt.pageY});
    }
  });


};



Drag.create = function(element, slots) {
  return new Drag(element, slots);
};
module.exports = Drag;
