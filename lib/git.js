var path = require('path');
var async = require('async');
var executeCommand = require('./execute-command');
var getCurrentVersion = require('./get-current-version');

var current_version = process.env.npm_package_version;
var pkg_path = path.resolve(process.cwd(), 'package.json');
var pkg = require(pkg_path);



function commit (callback) {
  getCurrentVersion(function (error, version) {
    if (error) {
      callback(error);
    } else {
      var message = 'Release v' + version;
      var command = 'git commit --all --message=\'' + message + '\'';
      executeCommand(command, callback);
    }
  });
}


function tag (callback) {
  getCurrentVersion(function (error, version) {
    if (error) {
      callback(error);
    } else {
      var tag = 'v' + version;
      var command = 'git tag -a ' + tag + ' --message=\'' + tag + '\'';
      executeCommand(command, callback);
    }
  });
}


function push (callback) {
  var command = 'git push';
  executeCommand(command, callback);
}


function pushTag (callback) {
  var command = 'git push origin --tags';
  executeCommand(command, callback);
}


module.exports = function (callback) {
  var tasks = [
    commit,
    tag,
    push,
    pushTag
  ];
  async.series(tasks, callback);
}
