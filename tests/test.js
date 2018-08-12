var assert = require('assert');

var createJoinedArray = require("../src/utils.js");

describe('calcUsageForHours', function() {
  describe('calcUsageForHours', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(createJoinedArray([0, 1, 2], 4), [0, 1, 2, 0, 1]);
    });
  });
});