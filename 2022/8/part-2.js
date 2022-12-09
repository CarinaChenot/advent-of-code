const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

let highestScenicScore = 0;

const forestRows = contents.split('\n');

for (let row = 0; row < forestRows.length; row++) {
  for (let column = 0; column < forestRows[row].length; column++) {
    const tree = parseInt(forestRows[row][column]);

    let nbOfTreesVisibleOnTheRight = 0;
    let nbOfTreesVisibleOnTheLeft = 0;
    let nbOfTreesVisibleOnTheTop = 0;
    let nbOfTreesVisibleOnTheBottom = 0;

    let loopLeft = column - 1;
    let loopRight = column + 1;
    let loopTop = row - 1;
    let loopBottom = row + 1;

    while (loopLeft >= 0) {
      if (forestRows[row][loopLeft] >= tree) {
        nbOfTreesVisibleOnTheLeft = column - loopLeft;
        break;
      }
      if (loopLeft === 0) {
        nbOfTreesVisibleOnTheLeft = column;
      }
      loopLeft--;
    }

    while (loopRight <= forestRows[row].length - 1) {
      if (forestRows[row][loopRight] >= tree) {
        nbOfTreesVisibleOnTheRight = loopRight - column;
        break;
      }
      if (loopRight === forestRows[row].length - 1) {
        nbOfTreesVisibleOnTheRight = loopRight - column;
      }
      loopRight++;
    }

    while (loopTop >= 0) {
      if (forestRows[loopTop][column] >= tree) {
        nbOfTreesVisibleOnTheTop = row - loopTop;
        break;
      }
      if (loopTop === 0) {
        nbOfTreesVisibleOnTheTop = row;
      }
      loopTop--;
    }

    while (loopBottom <= forestRows.length - 1) {
      if (forestRows[loopBottom][column] >= tree) {
        nbOfTreesVisibleOnTheBottom = loopBottom - row;
        break;
      }
      if (loopBottom === forestRows.length - 1) {
        nbOfTreesVisibleOnTheBottom = loopBottom - row;
      }
      loopBottom++;
    }

    const scenicScore = nbOfTreesVisibleOnTheTop * nbOfTreesVisibleOnTheLeft * nbOfTreesVisibleOnTheRight * nbOfTreesVisibleOnTheBottom;

    if (highestScenicScore < scenicScore) {
      highestScenicScore = scenicScore;
    }
  }
}

console.log(highestScenicScore);
