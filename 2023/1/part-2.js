const fs = require('fs');
const contents = fs.readFileSync('input.txt').toString('utf-8').trim();

const mapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  '2ne': 21,
  '8wo': 82,
  '8hree': 83,
  '7ine': 79,
  '1ight': 18,
  '3ight': 28,
  '5ight': 58,
  '9ight': 98,
};

const possibilities = Object.keys(mapping);

const sum = contents.split('\n').reduce((previousValue, currentLine) => {
  let testString = '';

  for (const character of currentLine) {
    testString += character;

    const letterSpelledNumber = possibilities.find((p) => testString.includes(p));

    if (letterSpelledNumber !== undefined) {
      testString = testString.replace(letterSpelledNumber, mapping[letterSpelledNumber]);
    }
  }

  const numbers = testString.split('').filter(char => /\d/.test(char));
  const calibrationValue = numbers[0] + numbers[numbers.length - 1];

  return previousValue + +calibrationValue;
}, 0);

console.log(sum);
