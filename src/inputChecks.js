'use strict';

export function checkRates(rates) {
    rates.forEach(item => {
        if (item.from < 0 || item.from > 23 || item.to < 0 || item.to > 23) {
            throw 'Oops! Input times for rates must be from 0 to 23';
        }
        if (item.value < 0) {
            throw 'Oops! Input value must be larger than 0';
        }
    });
}

export function checkDevices(devices) {
    devices.forEach(item => {
        if(item.power < 0 || item.duration < 0 || item.duration > 24) {
            throw 'Oops! ' + item.name + ' must have power and duration larger than 0 and duration must be less than 24';
        }
        if(item.mode && item.mode !== 'day' && item.mode !== 'night') {
            throw 'Oops! ' + item.mode + ' is not valid mode property';
        }
    });
}