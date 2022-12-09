const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trimEnd();

const [startingCrateStacks, procedures] = contents.split('\n\n');

const crateStacks = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
};

/**
 * Build initial crate stacks from input
 */
const startingCrateStackLine = startingCrateStacks.split('\n');

for (let i = startingCrateStackLine.length - 2; i >= 0; i--) {
  const row = startingCrateStackLine[i].split(/(.{1,3})(?:\s)/g).filter(Boolean);

  row.forEach((r, index) => {
    const [letter] = r.match(/\w/) || [];

    if (letter) {
      crateStacks[index + 1].push(letter);
    }
  });
}

/**
 * Apply procedures
 */
procedures.split('\n').forEach((procedure) => {
  console.log('Doing procedure:', procedure);
  const [qtyToMove, origin, destination] = procedure.replace(/[^\d]+/g, ',').split(',').filter(Boolean);

  for (let i = 0; i < parseInt(qtyToMove); i++) {
    const letterToMove = crateStacks[origin].pop();
    console.log(`Moved ${letterToMove} from ${origin} to ${destination}`);
    crateStacks[destination].push(letterToMove);
  }
});

/**
 * Get code
 */
const code = Object.keys(crateStacks).map((key) => {
  return crateStacks[key][crateStacks[key].length - 1];
}).join('');

console.log(crateStacks);
console.log(code);



