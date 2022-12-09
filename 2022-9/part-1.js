const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const headPosition = {
  x: 0,
  y: 0,
};

const tailPosition = {
  x: 0,
  y: 0,
};

const tailVisitedPlaces = [];
tailVisitedPlaces.push(`${tailPosition.x}, ${tailPosition.y}`);

const outputGrid = () => {
  let string = '';

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {

      if (headPosition.y === i && headPosition.x === j) {
        string += 'H';
      } else if (tailPosition.y === i && tailPosition.x === j) {
        string += 'T';
      } else {
        string += '.';
      }

      if (j === 5) {
        string += '\n';
      }
    }
  }

  return string;
};


const move = (axis, number) => {
  headPosition[axis] += number;

  const isTailTouchingHead = [headPosition.x, headPosition.x + 1, headPosition.x - 1].includes(tailPosition.x) && [headPosition.y, headPosition.y + 1, headPosition.y - 1].includes(tailPosition.y);

  if (isTailTouchingHead) {
    return;
  }

  const isTailInSameRowOrColumnThanHead = tailPosition.x === headPosition.x || tailPosition.y === headPosition.y;

  if (isTailInSameRowOrColumnThanHead) {
    tailPosition[axis] += number;
  } else {
    if (headPosition.x > tailPosition.x) {
      tailPosition.x++;
    } else if (headPosition.x < tailPosition.x) {
      tailPosition.x--;
    }

    if (headPosition.y > tailPosition.y) {
      tailPosition.y++;
    } else if (headPosition.y < tailPosition.y) {
      tailPosition.y--;
    }
  }

  tailVisitedPlaces.push(`${tailPosition.x}, ${tailPosition.y}`);
};

contents.split('\n').forEach((line) => {
  const [direction, number] = line.split(' ');

  for (let i = 0; i < parseInt(number); i++) {
    switch (direction) {
      case 'L':
        move('x', -1);
        break;
      case 'R':
        move('x', 1);
        break;
      case 'U':
        move('y', -1);
        break;
      case 'D':
        move('y', 1);
        break;
    }
  }
});

console.log(new Set(tailVisitedPlaces).size);

