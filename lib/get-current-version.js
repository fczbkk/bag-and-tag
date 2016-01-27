// You will be tempted to make this simple. To require the `package.json`.
// Or to get the version from `process.env.npm_package_version`. Don't do that.
// The problem is, that the version changes during the process. If one task
// bumps the version and the other task uses these methods to get it, it will
// receive the old value (not bumped).

// This is the easiest way to ensure you are always getting the current
// version. To load and parse the file manually each time.

var fs = require('fs-extra');
var path = require('path');

var pkg_path = path.resolve(process.cwd(), 'package.json');

module.exports = function (callback) {
  fs.readJson(pkg_path, function (error, data) {
    if (error) {
      callback(error);
    } else {
      callback(null, data.version);
    }
  });
}
