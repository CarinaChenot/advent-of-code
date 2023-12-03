const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();

const GEAR = '*';
const grid = input.split('\n');
/**
 * An object storing the adjacent numbers for
 * each gear coordinates
 * @example { '3,1': [ '467', '35' ] }
 */
const gearCoordinatesWithAdjacentNumbers = {};

const recordAdjacentNumberForCoordinates = (coordinates, number) => {
  if (gearCoordinatesWithAdjacentNumbers[coordinates]) {
    gearCoordinatesWithAdjacentNumbers[coordinates].push(number);
  } else {
    gearCoordinatesWithAdjacentNumbers[coordinates] = [number];
  }
};

for (let y = 0; y < grid.length; y++) {
  const numbersInRowMatches = [...grid[y].matchAll(/\d+/g)];

  for (const numberInRowMatch of numbersInRowMatches) {
    const number = numberInRowMatch[0];
    const start = numberInRowMatch.index - 1;
    const end = start + number.length + 1;

    // check left of number
    if (grid[y][start] === GEAR) {
      recordAdjacentNumberForCoordinates(start + ',' + y, number);
    }

    // check right of number
    if (grid[y][end] === GEAR) {
      recordAdjacentNumberForCoordinates(end + ',' + y, number);
    }

    for (let x = start; x <= end; x++) {
      // check top of number
      if (grid[y - 1]?.[x] === GEAR) {
        recordAdjacentNumberForCoordinates(x + ',' + (y - 1), number);
      }

      // check bottom of number
      if (grid[y + 1]?.[x] === GEAR) {
        recordAdjacentNumberForCoordinates(x + ',' + (y + 1), number);
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
