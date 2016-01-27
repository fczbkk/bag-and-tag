var exec = require('child_process').exec;
var colors = require('colors/safe');


module.exports = function (command, callback) {
  console.log(colors.yellow('executing command:'), command);
  exec(command, function (error, stdout, stderror) {
    if (stdout) {console.log(stdout);}
    if (stderror) {console.log(stderror);}
    callback(error);
  });
}
