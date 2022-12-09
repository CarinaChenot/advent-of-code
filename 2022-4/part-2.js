const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const buildRange = (start, end) => [...Array(end - start + 1).keys()]
  .reduce((str, currentNumber) =>
    str.concat(parseInt(start) + currentNumber, '.'), '.');

const total = contents.split('\n').filter((pair) => {
  const numbers = pair.match(/\d+/g);

  const firstSection = buildRange(numbers[0], numbers[1]);
  const secondSection = buildRange(numbers[2], numbers[3]);

  return firstSection.split('.').slice(1, -1).some(number => secondSection.includes('.' + number + '.')) ||
      secondSection.split('.').slice(1, -1).some(number => firstSection.includes('.' + number + '.'));
}).length;

console.log(total);
