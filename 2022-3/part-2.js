const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const rucksacks = contents.split('\n');
const groups = [];

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const groupSize = 3;

for (let i = 0; i < rucksacks.length; i += groupSize) {
  const group = rucksacks.slice(i, i + groupSize);
  groups.push(group);
}

const total = groups.map(group => {
  const itemTypeContainedInAll = group[0].split('').find((item) => {
    return group[1].includes(item) && group[2].includes(item)
  });

  return alphabet.indexOf(itemTypeContainedInAll) + 1;
}).reduce((sum, currentValue) => sum + currentValue, 0);

console.log(total);
