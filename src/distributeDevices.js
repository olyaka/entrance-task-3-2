'use strict';

import { findTimeRange } from './findTimeRange.js';

export function distr24HourDevices(devices, schedule, consumedEnergyPerHour) {
    devices.forEach(item => {
        if (item.duration === 24) {
            Object.keys(schedule).forEach(function(key, index) {
              schedule[key].push(item.id);
              consumedEnergyPerHour[index] += item.power;
            });
        }
    });
}

export function distrOtherDevices(devices, schedule, consumedEnergyPerHour, dayRates) {
    devices.forEach(item => {
        if (item.duration !== 24) {
          if (item.mode === "night") {
            var startHour = findTimeRange(
              dayRates,
              consumedEnergyPerHour,
              21,
              7,
              item,
              schedule
            );
          } else if (item.mode === "day") {
            var startHour = findTimeRange(
              dayRates,
              consumedEnergyPerHour,
              7,
              21,
              item,
              schedule
            );
          } else {
            var startHour = findTimeRange(
              dayRates,
              consumedEnergyPerHour,
              0,
              23,
              item,
              schedule
            );
          }
        }
    });
}