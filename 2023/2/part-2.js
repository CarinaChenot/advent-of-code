const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();

const games = input.split('\n');

let powerSum = 0;

for (const game of games) {
  let minimumRed = 0;
  let minimumGreen = 0;
  let minimumBlue = 0;

  const [gameId, sets] = game.replace('Game ', '').split(':').map((v, i) => i === 1 ? v.split(';') : v);

  for (const set of sets) {
    const redAmount = /\s?(\d+)\s(?=red)/.exec(set)?.[1] ?? '0';
    const greenAmount = /\s?(\d+)\s(?=green)/.exec(set)?.[1] ?? '0';
    const blueAmount = /\s?(\d+)\s(?=blue)/.exec(set)?.[1] ?? '0';

    minimumRed = Math.max(minimumRed, redAmount);
    minimumGreen = Math.max(minimumGreen, greenAmount);
    minimumBlue = Math.max(minimumBlue, blueAmount);
  }

  powerSum += minimumRed * minimumGreen * minimumBlue;
}

console.log(powerSum);
