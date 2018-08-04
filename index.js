var input = {
  devices: [
    {
      id: "F972B82BA56A70CC579945773B6866FB",
      name: "Посудомоечная машина",
      power: 950,
      duration: 3,
      mode: "night"
    },
    {
      id: "C515D887EDBBE669B2FDAC62F571E9E9",
      name: "Духовка",
      power: 2000,
      duration: 2,
      mode: "day"
    },
    {
      id: "02DDD23A85DADDD71198305330CC386D",
      name: "Холодильник",
      power: 50,
      duration: 24
    },
    {
      id: "1E6276CC231716FE8EE8BC908486D41E",
      name: "Термостат",
      power: 50,
      duration: 24
    },
    {
      id: "7D9DC84AD110500D284B33C82FE6E85E",
      name: "Кондиционер",
      power: 850,
      duration: 1
    }
  ],
  rates: [
    {
      from: 7,
      to: 10,
      value: 6.46
    },
    {
      from: 10,
      to: 17,
      value: 5.38
    },
    {
      from: 17,
      to: 21,
      value: 6.46
    },
    {
      from: 21,
      to: 23,
      value: 5.38
    },
    {
      from: 23,
      to: 7,
      value: 1.79
    }
  ],
  maxPower: 2100
};

var MAX_POWER = input.maxPower;

function calcDayRates(rates) {
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

function findMinHour(dayrates, consumedEnergy, start, end, item, schedule) {
  var duration = item.duration;
  var power = item.power;
  var id = item.id;
  var usage = [];

  if (start < end) {
    while (
      consumedEnergy[start] + power > MAX_POWER &&
      start + duration <= end
    ) {
      debugger;
      start += 1;
    }
    for (var i = start; i <= end - duration + 1; i++) {
      var k = 0;
      var sum = 0;
      while (k < duration) {
        sum += dayrates[i + k];
        k++;
      }
      usage.push(sum);
    }

    var index = start + usage.indexOf(Math.min.apply(null, usage));

    for (var i = index; i < index + duration; i++) {
      consumedEnergy[i] += power;
      schedule[i].push(item.id);
    }

    return index;
  } else {
    var joinedDayRates = [];
    for (var i = 0; i < dayrates.length + end + 1; i++) {
      if (i < dayrates.length) {
        joinedDayRates[i] = dayrates[i];
      } else {
        joinedDayRates[i] = dayrates[i - dayrates.length];
      }
    }

    for (var i = start; i <= joinedDayRates.length - duration; i++) {
      var k = 0;
      var sum = 0;
      while (k < duration) {
        sum += joinedDayRates[i + k];
        k++;
      }
      usage.push(sum);
    }

    var index = start + usage.indexOf(Math.min.apply(null, usage));
    var minIndex = index < dayrates.length ? index : index - dayrates.length;

    var endIndex =
      index + duration < dayrates.length
        ? index + duration
        : index + duration - dayrates.length;

    if (minIndex < endIndex) {
      for (var i = minIndex; i < endIndex; i++) {
        consumedEnergy[i] += power;
        schedule[i].push(item.id);
      }
    } else {
      for (var i = minIndex; i < consumedEnergy.length; i++) {
        consumedEnergy[i] += power;
        schedule[i].push(item.id);
      }
      for (var i = 0; i < endIndex; i++) {
        consumedEnergy[i] += power;
        schedule[i].push(item.id);
      }
    }

    return minIndex;
  }
}

//module.exports = function(input) {
function calcRates(input) {
  var devices = input.devices;
  var rates = input.rates;

  var schedule = {};
  var consumedEnergy = [];

  var dayRates = calcDayRates(rates);

  for (var i = 0; i < 24; i++) {
    schedule[i] = [];
    consumedEnergy[i] = 0;
  }

  devices.forEach(item => {
    if (item.duration === 24) {
      Object.keys(schedule).forEach(function(key, index) {
        schedule[key].push(item.id);
        consumedEnergy[index] += Number(item.power);
      });
    } else {
      if (item.mode === "night") {
        var startHour = findMinHour(
          dayRates,
          consumedEnergy,
          21,
          7,
          item,
          schedule
        );
      } else if (item.mode === "day") {
        var startHour = findMinHour(
          dayRates,
          consumedEnergy,
          7,
          21,
          item,
          schedule
        );
      } else {
        var startHour = findMinHour(
          dayRates,
          consumedEnergy,
          0,
          23,
          item,
          schedule
        );
      }
    }
  });

  console.log(consumedEnergy);

  return 1;
}

calcRates(input);
