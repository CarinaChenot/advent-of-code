const fs = require('node:fs');

const lines = fs.readFileSync('input.txt').toString('utf-8').trim().split('\n');
const sRow = lines.findIndex(l => l.includes(('S')));
const sCol = lines[sRow].indexOf('S');

/**
 *  N
 * W E
 *  S
 *  @returns {(number[]|null)[]}
 */
function getSurroundings(r, c) {
  return [
    r - 1 >= 0 ? [r - 1, c] : null, // north
    c + 1 < lines[0].length ? [r, c + 1] : null, // east
    r + 1 < lines.length ? [r + 1, c] : null, // south
    c - 1 >= 0 ? [r, c - 1] : null, // west
  ];
}

function hasPipeAlreadyBeenVisited(coords, pipesAlreadyVisited) {
  return pipesAlreadyVisited.some(([r, c]) => r === coords[0] && c === coords[1]);
}

/**
 * 7 ┐
 * F ┌
 * J ┘
 * L └
 * @param {number[][]} pipesAlreadyVisited
 * @return {number[]}
 */
function getNextPipeCoords(pipesAlreadyVisited) {
  const [currentRow, currentCol] = pipesAlreadyVisited.at(-1);
  const [northCoords, eastCoords, southCoords, westCoords] = getSurroundings(currentRow, currentCol);
  const current = lines[currentRow][currentCol];
  const north = northCoords && lines[northCoords[0]][northCoords[1]];
  const east = eastCoords && lines[eastCoords[0]][eastCoords[1]];
  const south = southCoords && lines[southCoords[0]][southCoords[1]];
  const west = westCoords && lines[westCoords[0]][westCoords[1]];

  if (['7', 'F', '|'].includes(north) &&
    ['S', '|', 'J', 'L'].includes(current) &&
    !hasPipeAlreadyBeenVisited(northCoords, pipesAlreadyVisited)) {
    return northCoords;
  }

  if (['7', 'J', '-'].includes(east) &&
    ['S', '-', 'L', 'F'].includes(current) &&
    !hasPipeAlreadyBeenVisited(eastCoords, pipesAlreadyVisited)) {
    return eastCoords;
  }

  if (['F', 'L', '-'].includes(west) &&
    ['S', '-', 'J', '7'].includes(current) &&
    !hasPipeAlreadyBeenVisited(westCoords, pipesAlreadyVisited)) {
    return westCoords;
  }

  if (['L', 'J', '|'].includes(south) &&
    ['S', '|', 'F', '7'].includes(current) &&
    !hasPipeAlreadyBeenVisited(southCoords, pipesAlreadyVisited)) {
    return southCoords;
  }
}

const pipesAlreadyVisited = [[sRow, sCol]];

let nextPipeCoords;
while (nextPipeCoords = getNextPipeCoords(pipesAlreadyVisited)) {
  pipesAlreadyVisited.push(nextPipeCoords);
}

console.log(pipesAlreadyVisited.length / 2);
