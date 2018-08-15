const assert = require("chai").assert;
import { createJoinedArray, sortDevices, addToSchedule } from "../src/utils";

describe("createJoinedArray", function() {
  it("createJoinedArray should return array prolonged to the end index", function() {
    assert.deepEqual(createJoinedArray([1, 2, 3, 4], 1), [1, 2, 3, 4, 1, 2]);
    assert.deepEqual(createJoinedArray([1, 2, 3, 4], 5), undefined);
  });
});

var devicesInput = [
  {
    power: 950
  },
  {
    power: 2000
  },
  {
    power: 50
  },
  {
    power: 50
  },
  {
    power: 850
  }
];

var devicesOutput = [
  {
    power: 2000
  },
  {
    power: 950
  },
  {
    power: 850
  },
  {
    power: 50
  },
  {
    power: 50
  }
];

describe("sortDevices", function() {
  it("sortDevices should sort device array", function() {
    assert.deepEqual(sortDevices(devicesInput), devicesOutput);
  });
});
