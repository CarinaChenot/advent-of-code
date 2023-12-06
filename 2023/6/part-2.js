const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();

const [t, d] = input.split('\n');

const time = parseInt(t.split(/\s+/).slice(1).join(''));
const distance = parseInt(d.split(/\s+/).slice(1).join(''));

let winPossibilities = 0;
for (let holdTime = 0; holdTime < time; holdTime++) {
  let distanceTraveled = holdTime * (time - holdTime);

  if (distanceTraveled > distance) {
    winPossibilities++;
  }
}

console.log(winPossibilities);
