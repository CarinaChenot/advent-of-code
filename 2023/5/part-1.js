const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();
const almanac = input.split('\n\n');

function isInteger(c) {
  return !isNaN(parseInt(c));
}

let lowestLocationNumber = 0;

const seeds = almanac[0].split(' ').filter(isInteger);
const maps = almanac.slice(1);

// retrieve the location for each seed
for (const seed of seeds) {
  let sourceNumber = +seed;
  for (const map of maps) {
    const ranges = map.split('\n').slice(1).map(r => r.split(' ')).map(r => r.map(v => parseInt(v)));
    for (const [destinationRangeStart, sourceRangeStart, rangeLength] of ranges) {
      if (sourceNumber < sourceRangeStart) {
        continue;
      }

      if (sourceNumber > (sourceRangeStart + rangeLength)) {
        continue;
      }

      const diff = sourceNumber - sourceRangeStart;
      sourceNumber = destinationRangeStart + diff;
      break;
    }
  }

  lowestLocationNumber = Math.min(sourceNumber, lowestLocationNumber || sourceNumber);
}

console.log(lowestLocationNumber);
