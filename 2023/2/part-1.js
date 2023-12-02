const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();

const games = input.split('\n');

const contents = {
  red: 12,
  green: 13,
  blue: 14
};

let sum = 0;

for (const game of games) {
  let wouldGameBePossible = true;
  const [gameId, sets] = game.replace('Game ', '').split(':').map((v, i) => i === 1 ? v.split(';') : v);

  for (const set of sets) {
    const redAmount = /\s?(\d+)\s(?=red)/.exec(set)?.[1] ?? '0';
    const greenAmount = /\s?(\d+)\s(?=green)/.exec(set)?.[1] ?? '0';
    const blueAmount = /\s?(\d+)\s(?=blue)/.exec(set)?.[1] ?? '0';

    if (redAmount > contents.red) {
      wouldGameBePossible = false;
    }

    if (greenAmount > contents.green) {
      wouldGameBePossible = false;
    }

    if (blueAmount > contents.blue) {
      wouldGameBePossible = false;
    }
  }

  if (wouldGameBePossible) {
    sum += +gameId;
  }
}

console.log(sum);
