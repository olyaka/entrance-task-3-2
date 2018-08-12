'use strict';

import { calcRatesPerHour } from './calcRatesPerHour.js';
import { sortDevices } from './utils.js';
import { distr24HourDevices, distrOtherDevices } from './distributeDevices.js';
import { checkDevices, checkRates } from './inputChecks.js';

export function getSchedule(input) {
    var devices = input.devices;
    var rates = input.rates;

    try {
      checkRates(rates);
      checkDevices(devices);
    
      var schedule = {};
      var consumedEnergyPerHour = [];
    
      var dayRates = calcRatesPerHour(rates);
    
      for (var i = 0; i < 24; i++) {
        schedule[i] = [];
        consumedEnergyPerHour[i] = 0;
      }
    
      devices = sortDevices(devices);
    
      console.log(devices);
  
      distr24HourDevices(devices, schedule, consumedEnergyPerHour);
      distrOtherDevices(devices, schedule, consumedEnergyPerHour, dayRates);
   
      Object.keys(schedule).forEach(function(item) {
        schedule[item].sort();
      });
    
      var deviceEnergy =  {}
  
      var sum = 0;
  
      for (var i = 0; i < devices.length; i++) {
        for (var j = 0; j < Object.keys(schedule).length; j++){
          schedule[j].forEach(item => {
            if(item === devices[i].id) {
              if (deviceEnergy[item]) {
                deviceEnergy[item] = (Number(deviceEnergy[item]) + devices[i].power * dayRates[j] / 1000).toFixed(4);
              } else {
                deviceEnergy[item] = (devices[i].power * dayRates[j] / 1000).toFixed(4);
              }
            }
          });
        }
        if(deviceEnergy[devices[i].id]) {
          sum += Number(deviceEnergy[devices[i].id]);
        }
      }
  
      var output = {
        'schedule': schedule,
        'consumedEnergy': {
          'value': sum.toFixed(4),
          'devices': deviceEnergy
        }
      }
    
      return output;

    } catch(e) {
      console.error(e);
    }


  }