var conventionalChangelog = require('conventional-changelog');
var concatStream = require('concat-stream');
var fs = require('fs');


var filename = './CHANGELOG.md';

var changelog_options = {
  preset: 'angular'
};


function mergeChangelog (new_content, old_content, callback) {
  var merged_content = Buffer.concat([new_content, old_content]);
  fs.writeFile(filename, merged_content, callback);
}


function addToChangelog (new_content, callback) {
  fs.readFile(filename, function (error, old_content) {
    if (error) {
      callback(error);
    } else {
      mergeChangelog(new_content, old_content, callback);
    }
  });
}


module.exports = function (callback) {
  conventionalChangelog(changelog_options)
    .pipe(concatStream(function (new_content) {
      addToChangelog(new_content, callback);
    }));
}
