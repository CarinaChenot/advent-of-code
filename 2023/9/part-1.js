const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert');

const lines = fs.readFileSync('2023/9/input.txt').toString('utf-8').trim().split('\n');

function computeTotal(histories) {
  let total = 0;

  for (const history of histories) {
    const parsedHistory = history.split(' ').map(parseFloat);
    const sequences = [parsedHistory];

    while (shouldComputeNewSequence(sequences[sequences.length - 1])) {
      sequences.push(computeNewSequence(sequences[sequences.length - 1]));
    }

    total += computeNextValueForHistory(sequences);
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
  if (previousSequence.length === 1) {
    return [0];
  }

  let newSequence = [];
  for (let i = 1; i < previousSequence.length; i++) {
    newSequence.push(previousSequence[i] - previousSequence[i - 1]);
  }
  return newSequence;
}

function computeNextValueForHistory(sequences) {
  return sequences.reduce((sum, s) => sum + s[s.length - 1], 0);
}

test('shouldComputeNewSequence', () => {
  assert.strictEqual(shouldComputeNewSequence([0, 0, 0]), false);
  assert.strictEqual(shouldComputeNewSequence([0, 1, 0]), true);
  assert.strictEqual(shouldComputeNewSequence([0]), false);
});

test('computeNewSequence', () => {
  assert.deepEqual(computeNewSequence([10, 13, 16, 21, 30, 45]), [3, 3, 5, 9, 15]);
  assert.deepEqual(computeNewSequence([0, -10, 1]), [-10, 11]);
  assert.deepEqual(computeNewSequence([0, -3, -5]), [-3, -2]);
  assert.deepEqual(computeNewSequence([-6, -11, -16]), [-5, -5]);
  assert.deepEqual(computeNewSequence([-5, -5]), [0]);
});

test('computeNextValueForHistory', () => {
  assert.strictEqual(computeNextValueForHistory([[0, 3, 6, 9, 12, 15], [3, 3, 3, 3, 3], [0, 0, 0, 0]]), 18);
  assert.strictEqual(computeNextValueForHistory([[-6, -11, -16], [-5, -5], [0]]), -21);
});

test('should handle history that ends with one number', () => {
  const histories = ['0 -1 4 30 99 245 525 1038 1973 3753 7431 15644 34662 78403 175746 383088 804886 1625931 3160350 5923858 10737621'];
  assert.notEqual(computeTotal(histories), NaN);
});

test('should compute total', () => {
  const total = computeTotal(lines);
  console.log(total);
  assert.notEqual(total, 2019144596); // too high
});
