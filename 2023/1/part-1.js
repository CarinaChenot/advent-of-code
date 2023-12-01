const fs = require('fs');

const contents = fs.readFileSync('input.txt').toString('utf-8').trim();

const sum = contents.split('\n').reduce((previousValue, currentValue, currentIndex, array) => {
  const numbers = currentValue.split('').filter(char => /\d/.test(char));
  const calibrationValue = numbers[0] + numbers[numbers.length - 1]
  return previousValue + +calibrationValue;
}, 0);

console.log(sum);




