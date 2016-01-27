// check for debug messages in code

var path = require('path');
var findFilesByContent = require('find-files-by-content');
var async = require('async');


function constructError (files) {
  var bullets = files.map(function (file_path) {
    return '\n- ' + file_path;
  });
  return 'These files contain debug code:' + bullets;
}


function checkFiles (config, callback) {
  findFilesByContent(config.pattern, config.path, function (files) {
    var error = (files.length > 0) ? constructError(files) : null;
    callback(error);
  });
}


module.exports = function (callback) {

  var configs = [
    {
      pattern: 'console.log',
      path: path.resolve(process.cwd(), './src/**/*.js')
    },
    {
      pattern: /^\s*(f|x)(it|describe)\(/,
      path: path.resolve(process.cwd(), './test/**/*.js')
    }
  ]
  async.each(configs, checkFiles, callback);
}
