const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();
const instructions = contents.split('\n');
const cyclesToWatch = [20, 60, 100, 140, 180, 220];
let cycle = 0;
let X = 1;
let signalStrengthSum = 0;
let instructionIndex = 0;

const incrementCycle = () => {
  cycle++;

  if (cyclesToWatch.includes(cycle)) {
    console.log({cycle, X, signalStrength: computeSignalStrength(cycle, X)});
    signalStrengthSum += computeSignalStrength(cycle, X);
  }
};

const computeSignalStrength = (cycle, X) => cycle * X;

while (cycle <= cyclesToWatch[cyclesToWatch.length - 1]) {
  incrementCycle();
  const [instruction, value] = instructions[instructionIndex].split(' ');
  instructionIndex++;

  if (instruction === 'noop') {
    continue;
  }

  if (instruction === 'addx') {
    incrementCycle();
    X += parseInt(value);
    continue;
  }
}

console.log(signalStrengthSum);
