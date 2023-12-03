const fs = require('fs');
const input = fs.readFileSync('example.txt').toString('utf-8').trim();

const GEAR = '*';
const grid = input.split('\n');
/**
 * An object storing the adjacent numbers for
 * each gear coordinates
 * @example { '31': [ '467', '35' ] }
 */
const gearCoordinatesWithAdjacentNumbers = {};
let key;

for (let y = 0; y < grid.length; y++) {
  const numbersInRowMatches = [...grid[y].matchAll(/\d+/g)];

  for (const numberInRowMatch of numbersInRowMatches) {
    const number = numberInRowMatch[0];
    const start = numberInRowMatch.index - 1;
    const end = start + number.length + 1;

    // check left of number
    if (grid[y][start] === GEAR) {
      key = ''.concat(start, y);
      if (gearCoordinatesWithAdjacentNumbers[key]?.length) {
        gearCoordinatesWithAdjacentNumbers[key].push(number);
      } else {
        gearCoordinatesWithAdjacentNumbers[key] = [number];
      }
    }

    // check right of number
    if (grid[y][end] === GEAR) {
      key = ''.concat(end, y);
      if (gearCoordinatesWithAdjacentNumbers[key]?.length) {
        gearCoordinatesWithAdjacentNumbers[key].push(number);
      } else {
        gearCoordinatesWithAdjacentNumbers[key] = [number];
      }
    }

    // check top of number
    for (let x = start; x <= end; x++) {
      if (grid[y - 1]?.[x] === GEAR) {
        key = ''.concat(x, y - 1);
        if (gearCoordinatesWithAdjacentNumbers[key]?.length) {
          gearCoordinatesWithAdjacentNumbers[key].push(number);
        } else {
          gearCoordinatesWithAdjacentNumbers[key] = [number];
        }
      }
    }

    // check bottom of number
    for (let x = start; x <= end; x++) {
      if (grid[y + 1]?.[x] === GEAR) {
        let key = ''.concat(x, y + 1);
        if (gearCoordinatesWithAdjacentNumbers[key]?.length) {
          gearCoordinatesWithAdjacentNumbers[key].push(number);
        } else {
          gearCoordinatesWithAdjacentNumbers[key] = [number];
        }
      }
    }
  }
}

const gearRatiosSum = Object.values(gearCoordinatesWithAdjacentNumbers).reduce((acc, value) => {
  if (value.length !== 2) {
    return acc;
  }
  return acc + value[0] * value[1];
}, 0);

console.log(gearRatiosSum);
