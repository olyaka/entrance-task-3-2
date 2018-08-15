"use strict";

export function sortDevices(devices) {
  devices.sort(function(a, b) {
    if (a.power > b.power) {
      return -1;
    }
    if (a.power < b.power) {
      return 1;
    }
    return 0;
  });

  return devices;
}

export function createJoinedArray(array, end) {
  if (end > array.length) {
    return;
  }
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

export function checkAvailableTimeSlot(
  item,
  consumedEnergy,
  start,
  end,
  MAX_POWER
) {
  while (
    consumedEnergy[start] + item.power > MAX_POWER &&
    start + item.duration <= end
  ) {
    start += 1;
  }

  if (start + item.duration === end + 1) {
    throw "Oops! It seems that " +
      item.name.toLowerCase() +
      " requires too much power :(";
  }
}
