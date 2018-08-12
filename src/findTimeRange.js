'use strict';

import { calcUsageForHours } from './calcUsageForHours.js';
import { createJoinedArray, addToSchedule, checkAvailableTimeSlot } from './utils.js';
import { MAX_POWER } from './index.js';


export function findTimeRange(dayrates, consumedEnergy, start, end, item, schedule) {
    var duration = item.duration;
    var usage = [];

    try {
      if (start < end) {
        checkAvailableTimeSlot(item, consumedEnergy, start, end, MAX_POWER);
    
        calcUsageForHours(start, end, duration, dayrates, usage);
    
        var index = start + usage.indexOf(Math.min.apply(null, usage));
    
        addToSchedule(item, schedule, consumedEnergy, index, index + duration);
  
      } else {
        checkAvailableTimeSlot(item, consumedEnergy, end, consumedEnergy.length + start, MAX_POWER);

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

    } catch(e) {
      console.error(e)
    }
  }