var fs = require('fs-extra');


module.exports = function (callback) {
  fs.copy('./temp/lib', './lib', callback);
}
