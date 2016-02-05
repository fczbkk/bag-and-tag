var async = require('async');
var colors = require('colors/safe');

var checkFiles = require('./check-files');
var buildLibrary = require('./build-library');
var generateChangelog = require('./changelog');
var bump = require('./bump');
var git = require('./git');
var publish = require('./publish');


var tasks = [
  checkFiles,
  buildLibrary,
  generateChangelog,
  bump,
  git,
  publish
];


module.exports = function (callback) {
  if (typeof callback !== 'function') {
    callback = function () {};
  }

  async.series(tasks, function (error) {
    if (error) {
      callback(error);
      console.log(colors.red.inverse('FAIL'), 'Release task did not finish.');
      console.log(error);
      process.exit(1);
    } else {
      callback();
      console.log(colors.green('SUCCESS'), 'Release task finished.');
    }
  });
}
