const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

// A for Rock, B for Paper, and C for Scissors.
// X for Rock, Y for Paper, and Z for Scissors

// (1 for Rock, 2 for Paper, and 3 for Scissors)
// outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)

const them = ['A', 'B', 'C'];
const you = ['X', 'Y', 'Z'];

const points = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

// Number on the right beats number on the left
const rules = [1, 2, 3];

const getOutcome = (them, you) => {
  if (them === you) {
    return 3;
  }

  if ((them === 1 && you === 2) || them === 2 && you === 3 || them === 3 && you === 1) {
    return 6;
  }

  return 0;
};

const generateScores = (them, you) => {
  const scores = {};

  for (let i = 0; i < them.length; i++) {
    for (let j = 0; j < you.length; j++) {
      scores[`${them[i]} ${you[j]}`] = points[you[j]] + getOutcome(points[them[i]], points[you[j]]);
    }
  }

  return scores;
};

const generatedScores = generateScores(them, you)
const rounds = contents.split('\n');
const totalScore = rounds.reduce((sum, currentValue) => sum + generatedScores[currentValue], 0)

console.log(totalScore);
