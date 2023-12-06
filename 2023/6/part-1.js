const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();

const [t, d] = input.split('\n');

const time = t.split(/\s+/).slice(1).map(v => parseInt(v));
const distance = d.split(/\s+/).slice(1).map(v => parseInt(v));

let result = 0;

for (let race = 0; race < time.length; race++) {
  let winPossibilities = 0;
  for (let holdTime = 0; holdTime < time[race]; holdTime++) {
    let distanceTraveled = holdTime * (time[race] - holdTime);

    if (distanceTraveled > distance[race]) {
      winPossibilities++;
    }
  }

  result = (result * winPossibilities) || winPossibilities;
}

console.log(result);
