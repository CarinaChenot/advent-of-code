const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert');

function parseInputWithAscii(input) {
  return input
    .replaceAll('|', '│')
    .replaceAll('-', '─')
    .replaceAll('7', '┐')
    .replaceAll('F', '┌')
    .replaceAll('J', '┘')
    .replaceAll('L', '└');
}

/**
 *  N
 * W E
 *  S
 *  @returns {(number[]|null)[]}
 */
function getSurroundings(r, c, lines) {
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
 * @param {number[][]} pipesAlreadyVisited
 * @param {string[]} lines
 * @return {number[]}
 */
function getNextPipeCoords(pipesAlreadyVisited, lines) {
  const [currentRow, currentCol] = pipesAlreadyVisited.at(-1);
  const [northCoords, eastCoords, southCoords, westCoords] = getSurroundings(currentRow, currentCol, lines);
  const current = lines[currentRow][currentCol];
  const north = northCoords && lines[northCoords[0]][northCoords[1]];
  const east = eastCoords && lines[eastCoords[0]][eastCoords[1]];
  const south = southCoords && lines[southCoords[0]][southCoords[1]];
  const west = westCoords && lines[westCoords[0]][westCoords[1]];

  if (['7', 'F', '|', '┐', '┌', '│'].includes(north) &&
    ['S', '|', 'J', 'L', '│', '┘', '└'].includes(current) &&
    !hasPipeAlreadyBeenVisited(northCoords, pipesAlreadyVisited)) {
    return northCoords;
  }

  if (['7', 'J', '-', '┐', '┘', '─'].includes(east) &&
    ['S', '-', 'L', 'F', '─', '└', '┌'].includes(current) &&
    !hasPipeAlreadyBeenVisited(eastCoords, pipesAlreadyVisited)) {
    return eastCoords;
  }

  if (['F', 'L', '-', '┌', '└', '─'].includes(west) &&
    ['S', '-', 'J', '7', '─', '┘', '┐'].includes(current) &&
    !hasPipeAlreadyBeenVisited(westCoords, pipesAlreadyVisited)) {
    return westCoords;
  }

  if (['L', 'J', '|', '└', '┘', '│'].includes(south) &&
    ['S', '|', 'F', '7', '│', '┌', '┐'].includes(current) &&
    !hasPipeAlreadyBeenVisited(southCoords, pipesAlreadyVisited)) {
    return southCoords;
  }
}

function getVisitedPipes(input) {
  const lines = input.split('\n');
  const sRow = lines.findIndex(l => l.includes(('S')));
  const sCol = lines[sRow].indexOf('S');
  const pipesAlreadyVisited = [[sRow, sCol]];

  let nextPipeCoords;
  while (nextPipeCoords = getNextPipeCoords(pipesAlreadyVisited, lines)) {
    pipesAlreadyVisited.push(nextPipeCoords);
  }

  return pipesAlreadyVisited;
}

/**
 * Returns the input with only the visited pipes
 */
function removeUnusedPipes(input, visitedPipes) {
  return input.split('\n').map((line, r) => {
    return line.split('').map((char, c) => {
      if (visitedPipes.some(([row, col]) => row === r && col === c)) {
        return char;
      }
      return ' ';
    }).join('');
  }).join('\n');
}

function getExtraHorizontalPipe(c) {
  if (['─', '┌', '└'].includes(c)) {
    return '─';
  }

  return ' ';
}

function getExtraVerticalPipe(c) {
  if (['│', '┌', '┐', 'S'].includes(c)) {
    return '│';
  }

  return ' ';
}

function expandGrid(input) {
  const withNewColumns = input.split('\n').map(line => {
    let newLine = '';
    for (let i = 0; i < line.length; i++) {
      newLine += line[i] + getExtraHorizontalPipe(line[i]);
    }
    return newLine;
  });

  return withNewColumns.reduce((acc, line, r) => {
    acc.push(line);
    acc.push(Array.from({length: line.length}, (_, c) => {
      return getExtraVerticalPipe(withNewColumns[r][c]);
    }).join(''));
    return acc;
  }, []).join('\n');
}

/**
 *
 * @param {number} r
 * @param {number} c
 * @param {string[]} lines
 * @param {number[][]} visited
 */
function visitNeighbours(r, c, lines, visited) {
  if (visited.some(([row, col]) => row === r && col === c)) {
    return;
  }

  visited.push([r, c]);

  const surroundings = getSurroundings(r, c, lines);
  surroundings.forEach((coord) => {
    if (coord === null) {
      return;
    }

    const [row, col] = coord;

    if (lines[row][col] === ' ') {
      setImmediate(() => visitNeighbours(row, col, lines, visited));
    }
  });
}


test('parseInputWithAscii', () => {
  const input = fs.readFileSync('2023/10/example.txt').toString('utf-8').trim();
  assert.equal(parseInputWithAscii(input), '..........\n' +
    '.S──────┐.\n' +
    '.│┌────┐│.\n' +
    '.││....││.\n' +
    '.││....││.\n' +
    '.│└─┐┌─┘│.\n' +
    '.│..││..│.\n' +
    '.└──┘└──┘.\n' +
    '..........');
});

test('removeUnusedPipes', () => {
  const input = fs.readFileSync('2023/10/example2.txt').toString('utf-8').trim();
  const parsedInput = parseInputWithAscii(input);
  const visitedPipes = getVisitedPipes(parsedInput);
  assert.equal(removeUnusedPipes(parsedInput, visitedPipes),
    ' ┌┐┌S┌┐┌┐┌┐┌┐┌┐┌───┐\n' +
    ' │└┘││││││││││││┌──┘\n' +
    ' └─┐└┘└┘││││││└┘└─┐ \n' +
    '┌──┘┌──┐││└┘└┘ ┌┐┌┘ \n' +
    '└───┘┌─┘└┘    ┌┘└┘  \n' +
    '   ┌─┘┌───┐   └┐    \n' +
    '  ┌┘┌┐└┐┌─┘┌┐  └───┐\n' +
    '  └─┘└┐││┌┐│└┐┌─┐┌┐│\n' +
    '     ┌┘│││││┌┘└┐││└┘\n' +
    '     └─┘└┘└┘└──┘└┘  ');
});

test('expandGrid', () => {
  const input = fs.readFileSync('2023/10/example2.txt').toString('utf-8').trim();
  const parsedInput = parseInputWithAscii(input);
  const visitedPipes = getVisitedPipes(parsedInput);
  const inputWithoutUnusedPipes = removeUnusedPipes(parsedInput, visitedPipes);
  const expandedGrid = expandGrid(inputWithoutUnusedPipes);
  assert.equal(expandedGrid,
    '  ┌─┐ ┌─S ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌───────┐ \n' +
    '  │ │ │ │ │ │ │ │ │ │ │ │ │ │ │       │ \n' +
    '  │ └─┘ │ │ │ │ │ │ │ │ │ │ │ │ ┌─────┘ \n' +
    '  │     │ │ │ │ │ │ │ │ │ │ │ │ │       \n' +
    '  └───┐ └─┘ └─┘ │ │ │ │ │ │ └─┘ └───┐   \n' +
    '      │         │ │ │ │ │ │         │   \n' +
    '┌─────┘ ┌─────┐ │ │ └─┘ └─┘   ┌─┐ ┌─┘   \n' +
    '│       │     │ │ │           │ │ │     \n' +
    '└───────┘ ┌───┘ └─┘         ┌─┘ └─┘     \n' +
    '          │                 │           \n' +
    '      ┌───┘ ┌───────┐       └─┐         \n' +
    '      │     │       │         │         \n' +
    '    ┌─┘ ┌─┐ └─┐ ┌───┘ ┌─┐     └───────┐ \n' +
    '    │   │ │   │ │     │ │             │ \n' +
    '    └───┘ └─┐ │ │ ┌─┐ │ └─┐ ┌───┐ ┌─┐ │ \n' +
    '            │ │ │ │ │ │   │ │   │ │ │ │ \n' +
    '          ┌─┘ │ │ │ │ │ ┌─┘ └─┐ │ │ └─┘ \n' +
    '          │   │ │ │ │ │ │     │ │ │     \n' +
    '          └───┘ └─┘ └─┘ └─────┘ └─┘     \n' +
    '                                        ');
});

test('visitNeighbours', () => {
  const input = fs.readFileSync('2023/10/input.txt').toString('utf-8').trim();
  const parsedInput = parseInputWithAscii(input);
  const visitedPipes = getVisitedPipes(parsedInput);
  const inputWithoutUnusedPipes = removeUnusedPipes(parsedInput, visitedPipes);
  const expandedGrid = expandGrid(inputWithoutUnusedPipes);
  const visited = [];
  visitNeighbours(0, 0, expandedGrid.split('\n'), visited);
  console.log(visited);

  setTimeout(() => {
    console.log(visited);
  }, 10000);

});

/**
 * @param {string} input
 * @param {number[][]} tilesOutsideLoop
 */
function getInputWithMarkedTilesOutsideLoop(input, tilesOutsideLoop) {
  const lines = input.split('\n');
  for (const [r, c] of tilesOutsideLoop) {
    lines[r] = lines[r].substring(0, c) + 'X' + lines[r].substring(c + 1);
  }
  return lines.join('\n');
}

test('getVisualisation', () => {
  const input = fs.readFileSync('2023/10/input.txt').toString('utf-8').trim();
  const parsedInput = parseInputWithAscii(input);
  const visitedPipes = getVisitedPipes(parsedInput);
  const inputWithoutUnusedPipes = removeUnusedPipes(parsedInput, visitedPipes);
  const expandedGrid = expandGrid(inputWithoutUnusedPipes);
  const visited = [];
  visitNeighbours(0, 0, expandedGrid.split('\n'), visited);

  setTimeout(() => {
    const newInput = getInputWithMarkedTilesOutsideLoop(expandedGrid, visited);

    console.log(newInput);
  }, 10000);
});

function shrinkGrid(input) {
  const lines = input.split('\n');

  const newLines = lines.reduce((acc, line, r) => {
    if (r % 2 === 0) {
      acc.push(line);
    }

    return acc;
  }, []);

  return newLines.map((line,) => {
    return line.split('').reduce((acc, char, c) => {
      if (c % 2 === 0) {
        acc.push(char);
      }

      return acc;
    }, []).join('');
  }).join('\n');
}


test('shrinkGrid', () => {
  const input = fs.readFileSync('2023/10/input.txt').toString('utf-8').trim();
  const parsedInput = parseInputWithAscii(input);
  const visitedPipes = getVisitedPipes(parsedInput);
  const inputWithoutUnusedPipes = removeUnusedPipes(parsedInput, visitedPipes);
  const expandedGrid = expandGrid(inputWithoutUnusedPipes);
  const visited = [];
  visitNeighbours(0, 0, expandedGrid.split('\n'), visited);

  setTimeout(() => {
    const newInput = getInputWithMarkedTilesOutsideLoop(expandedGrid, visited);

    console.log(shrinkGrid(newInput));
  }, 10000);
});


function countEnclosed(input) {
  const lines = input.split('\n');
  let count = 0;
  for (const line of lines) {
    for (const char of line) {
      if (char === ' ') {
        count++;
      }
    }
  }

  return count;
}

test('countEnclosed', () => {
  const input = fs.readFileSync('2023/10/input.txt').toString('utf-8').trim();
  const parsedInput = parseInputWithAscii(input);
  const visitedPipes = getVisitedPipes(parsedInput);
  const inputWithoutUnusedPipes = removeUnusedPipes(parsedInput, visitedPipes);
  const expandedGrid = expandGrid(inputWithoutUnusedPipes);
  const visited = [];
  visitNeighbours(0, 0, expandedGrid.split('\n'), visited);

  setTimeout(() => {
    const newInput = getInputWithMarkedTilesOutsideLoop(expandedGrid, visited);
    const shrunkGrid = shrinkGrid(newInput);
    console.log(countEnclosed(shrunkGrid));
  }, 10000);
});
