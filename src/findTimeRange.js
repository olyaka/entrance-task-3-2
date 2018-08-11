'use strict';

import {calcUsageForHours} from './calcUsageForHours.js';
import {createJoinedArray, addToSchedule} from './utils.js';
import { MAX_POWER } from './index.js';

export function findTimeRange(dayrates, consumedEnergy, start, end, item, schedule) {
    var duration = item.duration;
    var power = item.power;
    var id = item.id;
    var usage = [];
  
    if (start < end) {
      while (
        consumedEnergy[start] + power > MAX_POWER &&
        start + duration <= end
      ) {
        start += 1;
      }
  
      calcUsageForHours(start, end, duration, dayrates, usage);
  
      var index = start + usage.indexOf(Math.min.apply(null, usage));
  
      addToSchedule(item, schedule, consumedEnergy, index, index + duration);

    } else {
      while (
        consumedEnergy[start] + power > MAX_POWER &&
        start + duration <= end
      ) {
        start += 1;
      }

      var joinedDayRates =  createJoinedArray(dayrates, end);

      calcUsageForHours(start, joinedDayRates.length - 1, duration, joinedDayRates, usage);
  
      var index = start + usage.indexOf(Math.min.apply(null, usage));
      var startIndex = index < dayrates.length ? index : index - dayrates.length;
      var endIndex =
        index + duration < dayrates.length
          ? index + duration
          : index + duration - dayrates.length;
  
      if (startIndex < endIndex) {
        addToSchedule(item, schedule, consumedEnergy, startIndex, endIndex);
      } else {
        addToSchedule(item, schedule, consumedEnergy, startIndex, consumedEnergy.length);
        addToSchedule(item, schedule, consumedEnergy, 0, endIndex);
      }
    }
  }