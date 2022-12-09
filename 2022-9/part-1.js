const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const numbersTotal = 500;

const grid = [...Array(numbersTotal * 2).fill(Array(numbersTotal * 2).fill(0))];

const headPosition = {
  x: numbersTotal,
  y: numbersTotal,
};

const tailPosition = {
  x: numbersTotal,
  y: numbersTotal,
};

grid[tailPosition.x][tailPosition.y]++;

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

  grid[tailPosition.x][tailPosition.y]++;
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

const positionsTailVisitedCount = grid.reduce((sumA, currentVal) => {
  return currentVal.reduce((sum, currentVal2) => {
    return currentVal2 > 0 ? sum + 1 : sum;
  }, 0);
}, 0);

console.log(positionsTailVisitedCount);

if (positionsTailVisitedCount >= 88800 || positionsTailVisitedCount === 8888 || positionsTailVisitedCount === 376) {
  console.log('wrong');
}
