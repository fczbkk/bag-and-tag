var fs = require('fs-extra');
var path = require('path');
var assert = require('assert');

var bagAndTag = require('./../lib/index.js');


describe('bag-and-tag', function () {

  var temp_dir = path.resolve(__dirname, './../temp');

  it('should exist', function () {
    assert.ok(bagAndTag);
  });

});
