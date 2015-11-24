var Glass = require("glob.glass");
var Widget = require("wdg");


exports.start = function() {
    ["A", "B", "C", "D", "E", "F"].forEach(function (id) {
        var div = new Widget({id: id});
        console.info("[test] div(#" + id + ")=...", div);
        div.clear(newGlass());
    });
};


function newGlass() {
    var size = randint(3, 9);
    var content = randint(size);
    var target = randint(size);
    var glass = new Glass(size, content, target);
    glass.Tap(function() {
        content = parseInt(prompt("New content:"));
        content = Math.max(Math.min(content, size), 0);
        glass.content(content);
        console.info("[test] glass=...", glass);
    });
    return glass;
}

function randint(a, b) {
    if (typeof b === 'undefined') {
        b = a;
        a = 0;
    }
    return a + Math.floor(Math.random() * (b - a));
}
