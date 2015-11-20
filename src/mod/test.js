var Glass = require("glob.glass");
var Widget = require("wdg");


exports.start = function() {
    console.log("start");
    ["A", "B", "C", "D", "E", "F"].forEach(function (id) {
        var div = new Widget({id: id});
        console.info("[test] div(#" + id + ")=...", div);
        var size = randint(3, 9);
        var glass = new Glass(size, randint(size), randint(size));
        console.info("[test] glass=...", glass);
        div.clear(glass);
    });
}


function randint(a, b) {
    if (typeof b === 'undefined') {
        b = a;
        a = 0;
    }
    return a + Math.floor(Math.random() * (b - a));
}
