'use strict';

export function calcRatesPerHour(rates) {
    var dayRates = [];
  
    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < rates.length; j++) {
        if (i < rates[j].to && i >= rates[j].from) {
          dayRates[i] = rates[j].value;
        } else if (rates[j].from > rates[j].to) {
          if (i < rates[j].to || i >= rates[j].from) {
            dayRates[i] = rates[j].value;
          }
        }
      }
    }
    return dayRates;
}
