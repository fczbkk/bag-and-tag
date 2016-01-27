var inquirer = require('inquirer');
var executeCommand = require('./execute-command');


var questions = [
  {
    name: 'confirm',
    message: 'Do you want to publish this project to NPM?',
    type: 'confirm',
    default: false
  }
];


module.exports = function (callback) {
  inquirer.prompt(questions, function (answers) {
    if (answers.confirm === true) {
      var command = 'npm publish';
      executeCommand(command, callback);
    } else {
      callback();
    }
  });
}
