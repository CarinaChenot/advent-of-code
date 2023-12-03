const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();

const symbols = [...new Set(input.match(/[^\w.\s]/g))];
const grid = input.split('\n');
const partNumbers = [];

for (let y = 0; y < grid.length; y++) {
  const numbersInRowMatches = [...grid[y].matchAll(/\d+/g)];

  for (const numberInRowMatch of numbersInRowMatches) {
    const number = numberInRowMatch[0];
    const start = numberInRowMatch.index - 1;
    const end = start + number.length + 1;

    // check left of number
    if (symbols.includes(grid[y][start])) {
      partNumbers.push(number);
      continue;
    }

    // check right of number
    if (symbols.includes(grid[y][end])) {
      partNumbers.push(number);
      continue;
    }

    // check top of number
    for (let x = start; x <= end; x++) {
      if (symbols.includes(grid[y - 1]?.[x])) {
        partNumbers.push(number);
        break;
      }
    }

    // check bottom of number
    for (let x = start; x <= end; x++) {
      if (symbols.includes(grid[y + 1]?.[x])) {
        partNumbers.push(number);
        break;
      }
    }
  }
}

console.log(partNumbers.reduce((p, c) => p + +c, 0));
