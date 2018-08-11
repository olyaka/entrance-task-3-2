'use strict';

export function sortDevices(devices) {
    return devices.sort(function(a, b) {
        if (a.power > b.power) {
          return -1;
        }
        if (a.power < b.power) {
          return 1;
        }
        return 0;
      });
}

export function createJoinedArray(array, end) {
    var joinedArray = [];
    for (var i = 0; i < array.length + end + 1; i++) {
        if (i < array.length) {
          joinedArray[i] = array[i];
        } else {
          joinedArray[i] = array[i - array.length];
        }
    }
    return joinedArray;
}

export function addToSchedule(item, schedule, consumedEnergy, index, endIndex) {
    for (var i = index; i < endIndex; i++) {
        consumedEnergy[i] += item.power;
        schedule[i].push(item.id);
      }
}