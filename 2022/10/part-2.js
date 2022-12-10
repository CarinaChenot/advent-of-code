const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();
const instructions = contents.split('\n');
const cyclesToWatch = [40, 80, 120, 160, 200, 240];
let cycle = 0;
let X = 1; // sprite position in middle
let instructionIndex = 0;
let drawing = '';

const incrementCycle = () => {
  cycle++;
  draw();
};

const draw = () => {
  if (cyclesToWatch.includes(cycle - 1)) {
    drawing += '\n';
  }

  const pixelsCoveredBySprite = [X, X + 1, X + 2];

  if (pixelsCoveredBySprite.includes(cycle % 40)) {
    drawing += '#';
    return;
  }

  drawing += '.';
};

while (cycle <= cyclesToWatch[cyclesToWatch.length - 1]) {
  if (!instructions[instructionIndex]) {
    break;
  }

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

console.log(drawing);
