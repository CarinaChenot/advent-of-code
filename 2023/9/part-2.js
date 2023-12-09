const fs = require('node:fs');
const lines = fs.readFileSync('input.txt').toString('utf-8').trim().split('\n');

/**
 * @param {number[]} previousSequence
 * @returns {boolean}
 */
function shouldComputeNewSequence(previousSequence) {
  return previousSequence.some(v => v !== 0);
}

/**
 * @param {number[]} previousSequence
 * @returns {number[]}
 */
function computeNewSequence(previousSequence) {
  return previousSequence.slice(1).map((v, i) => v - previousSequence[i]);
}

let total = 0;

for (const history of lines) {
  const sequences = [history.split(' ').map(parseFloat)];

  while (shouldComputeNewSequence(sequences.at(-1))) {
    sequences.push(computeNewSequence(sequences.at(-1)));
  }

  for (let i = sequences.length - 1; i > 0; i--) {
    sequences[i - 1].unshift(sequences[i - 1][0] - sequences[i][0]);
  }

  total += sequences[0][0];
}

console.log(total);
