const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert');

const lines = fs.readFileSync('2023/9/example.txt').toString('utf-8').trim().split('\n');

function computeTotal(histories) {
  let total = 0;

  for (const history of histories) {
    let sequence = history.split(' ').map(parseFloat);

    while (shouldComputeNewSequence(sequence)) {
      total += sequence.at(-1);
      sequence = computeNewSequence(sequence);
    }
  }

  return total;
}

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


test('shouldComputeNewSequence', () => {
  assert.strictEqual(shouldComputeNewSequence([0, 0, 0]), false);
  assert.strictEqual(shouldComputeNewSequence([0, 1, 0]), true);
  assert.strictEqual(shouldComputeNewSequence([0]), false);
});

test('computeNewSequence', () => {
  assert.deepEqual(computeNewSequence([10, 13, 16, 21, 30, 45]), [3, 3, 5, 9, 15]);
  assert.deepEqual(computeNewSequence([0, -10, 1]), [-10, 11]);
  assert.deepEqual(computeNewSequence([10, 7, 4, 1, -2, -5]), [-3, -3, -3, -3, -3]);
  assert.deepEqual(computeNewSequence([0, -3, -5]), [-3, -2]);
  assert.deepEqual(computeNewSequence([-6, -11, -16]), [-5, -5]);
  assert.deepEqual(computeNewSequence([-5, -5]), [0]);
  assert.deepEqual(computeNewSequence([3, 3, 5, 9, 15]), [0, 2, 4, 6]);
});


test('should handle history that ends with one number', () => {
  const histories = ['0 -1 4 30 99 245 525 1038 1973 3753 7431 15644 34662 78403 175746 383088 804886 1625931 3160350 5923858 10737621'];
  assert.notEqual(computeTotal(histories), NaN);
});

test('should compute total', () => {
  const total = computeTotal(lines);
  console.log(total);
  assert.equal(total, 114);
  assert.equal(total, 2);
  assert.notEqual(total, -137);
  assert.notEqual(total, -171);
});
