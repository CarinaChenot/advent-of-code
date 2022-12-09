const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const rucksacks = contents.split('\n');

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const total = rucksacks.map(rucksack => {
  const firstPart = rucksack.slice(0, rucksack.length / 2);
  const secondPart = rucksack.slice(rucksack.length / 2, rucksack.length);

  const itemTypeContainedInBoth = firstPart.split('').find((item) => secondPart.includes(item));

  return alphabet.indexOf(itemTypeContainedInBoth) + 1;
}).reduce((sum, currentValue) => sum + currentValue, 0);


console.log(total);
