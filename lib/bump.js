var fs = require('fs-extra');
var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var async = require('async');


var current_version = process.env.npm_package_version;


var files_to_update = [
  './package.json',
  './bower.json',
  './blebleble.json'
];


var questions = [
  {
    name: 'severity',
    message: 'Release severity (current version: ' + current_version + ')',
    type: 'list',
    choices: ['patch', 'minor', 'major'].map(function (item) {
      return {
        value: item,
        name: item + ' (' + semver.inc(current_version, item) + ')'
      }
    }),
    default: 'patch'
  }
];


function fileExists (file_path, callback) {
  full_file_path = path.resolve(process.cwd(), file_path);
  fs.stat(full_file_path, function (error, stat) {
    if (error) {
      callback(false);
    } else {
      callback(stat.isFile());
    }
  });
}


function getTargetVersion (callback) {
  inquirer.prompt(questions, function (answers) {
    var new_version = semver.inc(current_version, answers.severity);
    callback(null, new_version);
  })
}


function updateJsonFile (file_path, data, callback) {
  fs.readJson(file_path, function (error, file_data) {
    if (error) {
      callback(error);
    } else {
      for (key in data) {
        file_data[key] = data[key];
      }
      fs.writeJson(file_path, file_data, callback);
    }
  });
}


function updateVersionInFiles (version, callback) {
  async.filter(files_to_update, fileExists, function (existing_files) {
    async.each(existing_files, function (file_path, callback) {
      var full_file_path = path.resolve(process.cwd(), file_path);
      var data = {version: version};
      updateJsonFile(full_file_path, data, callback);
    }, callback);
  });
}


module.exports = function (callback) {
  getTargetVersion(function (error, version) {
    updateVersionInFiles(version, callback);
  });
}
