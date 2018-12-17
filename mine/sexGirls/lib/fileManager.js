const fs = require('fs');

var fileManager = module.exports;

fileManager.write = function(path, value) {

    if (typeof (value) === 'object')
        value = JSON.stringify(value, null, 2);

    fs.writeFileSync(__dirname + '/../' + path, value, 'utf8');

};

fileManager.state = function (path) {

    return fs.lstatSync(__dirname + '/../' + path);

};

fileManager.exists = function (path) {
console.log(__dirname + '/../' + path);
    return fs.existsSync(__dirname + '/../' + path);

};

fileManager.mkdir = function (path) {

    return fs.mkdirSync(__dirname + '/../' + path, {
        recursive: true
    });

};

