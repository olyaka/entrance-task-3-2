'use strict';

export function calcUsageForHours(start, end, duration, dayrates, usage) {
  for (var i = start; i <= end - duration + 1; i++) {
    var k = 0;
    var sum = 0;
    while (k < duration) {
      sum += dayrates[i + k];
      k++;
    }
    usage.push(sum);
  }
}