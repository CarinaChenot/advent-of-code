const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

let numberOfVisibleTrees = 0;

const forestRows = contents.split('\n');

for (let row = 0; row < forestRows.length; row++) {
  for (let column = 0; column < forestRows[row].length; column++) {
    const tree = parseInt(forestRows[row][column]);
    const isEdge = row === 0 || column === 0 || row === forestRows.length - 1 || column === forestRows[row].length;

    if (isEdge) {
      numberOfVisibleTrees++;
      continue;
    }

    let isVisibleFromLeft = true;
    let isVisibleFromRight = true;
    let isVisibleFromTop = true;
    let isVisibleFromBottom = true;


    let loopLeft = column - 1;
    let loopRight = column + 1;
    let loopTop = row - 1;
    let loopBottom = row + 1;
    while (loopLeft >= 0) {
      if (forestRows[row][loopLeft] >= tree) {
        isVisibleFromLeft = false;
        break;
      }
      loopLeft--;
    }

    while (loopRight <= forestRows[row].length -1) {
      if (forestRows[row][loopRight] >= tree) {
        isVisibleFromRight = false;
        break;
      }
      loopRight++;

    }

    while (loopTop >= 0) {
      if (forestRows[loopTop][column] >= tree) {
        isVisibleFromTop = false;
        break;
      }
      loopTop--;
    }


    while (loopBottom <= forestRows.length - 1) {
      if (forestRows[loopBottom][column] >= tree) {
        isVisibleFromBottom = false;
        break;
      }
      loopBottom++;
    }


    if (isVisibleFromTop || isVisibleFromLeft || isVisibleFromBottom || isVisibleFromRight) {
      numberOfVisibleTrees++;
    }
  }
}

console.log(numberOfVisibleTrees);
