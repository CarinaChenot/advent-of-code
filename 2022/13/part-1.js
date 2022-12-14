const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const pairs = contents.split('\n\n');

const handlePair = (pair, i) => {
  console.log(`== Pair ${i + 1} ==`)

  const [firstPacket, secondPacket] = pair.split('\n').map(string => JSON.parse(string))

  return compareArrays(firstPacket, secondPacket)
}

const compareArrays = (left, right) => {
  console.log(`- Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);

  for (var i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      console.log(`  - Right side ran out of items, so inputs are not in the right order`)
      return false;
    }

    const test = compareValues(left[i], right[i]);

    if (typeof test === 'boolean') {
      return test;
    }
  }

  if (left[i] === undefined && right[i] !== undefined) {
    console.log(`  - Left side ran out of items, so inputs are in the right order`)
    return true;
  }
}

const compareValues = (left, right) => {
  console.log(`- Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);

  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      console.log(`  - Left side is smaller, so inputs are in the right order`)
      return true;
    }

    if (left > right) {
      console.log(`  - Right side is smaller, so inputs are not in the right order`)
      return false;
    }
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return compareArrays(left, right)
  }

  if (Array.isArray(left) && typeof right === 'number') {
    console.log(`  - Mixed types; convert right to [${right}] and retry comparison`);
    return compareArrays(left, [right]);
  }

  if (Array.isArray(right) && typeof left === 'number') {
    console.log(`  - Mixed types; convert left to [${left}] and retry comparison`);
    return compareArrays([left], right)
  }
}

const sumOfIndicesOfPairsInTheRightOrder = pairs.map(handlePair).reduce((sum, isInTheRightOrder, currentIndex) =>
    isInTheRightOrder ? sum + currentIndex + 1 : sum, 0)

console.log(sumOfIndicesOfPairsInTheRightOrder)



