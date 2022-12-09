const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const nbKnots = 10;
const tailKnot = nbKnots - 1;

const knots = [...Array(nbKnots)].map(() => ({
  x: 0,
  y: 0,
}));

const tailVisitedPlaces = [];
tailVisitedPlaces.push(`${knots[tailKnot].x}, ${knots[tailKnot].y}`);

const move = (axis, number, knot = 0) => {
  if (knot === 0) {
    knots[knot][axis] += number;
  }

  const headPosition = knots[knot];
  const tailPosition = knots[knot + 1];

  const isTailTouchingHead = Math.abs(headPosition.x - tailPosition.x) < 2 && Math.abs(headPosition.y - tailPosition.y) < 2;

  if (isTailTouchingHead) {
    return;
  }

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

  if (knot === tailKnot - 1) {
    tailVisitedPlaces.push(`${tailPosition.x}, ${tailPosition.y}`);
  } else {
    move(axis, number, knot + 1);
  }
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

