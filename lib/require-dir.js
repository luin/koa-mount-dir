var fs = require('fs');
var path = require('path');

var requireDirectory = module.exports = function(directory) {
  directory = path.resolve(directory);
  return fs.readdirSync(directory).reduce(function(hash, file) {
    var filePath = path.join(directory, file);
    var fileName = file.substring(0, file.lastIndexOf('.'));
    var fileExtension = file.substring(file.lastIndexOf('.'));

    if (fs.statSync(filePath).isDirectory()) {
      hash[path.basename(filePath)] = requireDirectory(filePath);
    } else {
      if (fileExtension !== '.coffee' && fileExtension !== '.js') {
        return hash;
      } else {
        hash[fileName] = require(filePath);
      }
    }
    return hash;
  }, {});
};
