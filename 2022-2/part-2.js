const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const them = ['A', 'B', 'C'];
const you = ['X', 'Y', 'Z'];

const points = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 0, // loss
  Y: 3, // draw
  Z: 6, // win
};

const decypher = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'loss',
  Y: 'draw',
  Z: 'win',
};

const getPlayPoints = (them, outcome) => {
  if (outcome === 'draw') {
    return them;
  }

  if (outcome === 'win') {
    return them === 3 ? 1 : them + 1;
  }

  if (outcome === 'loss') {
    return them === 1 ? 3 : them - 1;
  }

  return 0;
};

const generateScores = (them, you) => {
  const scores = {};

  for (let i = 0; i < them.length; i++) {
    for (let j = 0; j < you.length; j++) {
      scores[`${them[i]} ${you[j]}`] = points[you[j]] + getPlayPoints(points[them[i]], decypher[you[j]]);
    }
  }

  return scores;
};

const generatedScores = generateScores(them, you);
const rounds = contents.split('\n');
const totalScore = rounds.reduce((sum, currentValue) => sum + generatedScores[currentValue], 0);

console.log(totalScore);
