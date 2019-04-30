"use strict";
var fs = require("fs");
var path = "./source/photos/";
fs.readdir(path, function (err, files) {
    if (err) {
        return;
    }
    var arr = [];
    (function iterator(index) {
        if (index == files.length) {
            fs.writeFile("./source/photos/data.json", JSON.stringify(arr, null, "\t"),function(err, written, buffer){});
            console.log('get img success!');
            return;
        }
        fs.stat(path + files[index], function (err, stats) {
            if (err) {
                return;
            }
            if (stats.isFile()) {
                arr.push(files[index]);
            }
            iterator(index + 1);
        })
    }(0));
});