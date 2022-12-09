const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const getNumber = () => {
  for (const i in contents) {
    const past4Characters = contents.slice(i - 4, i);

    if (new Set(past4Characters).size === 4) {
      return i;
    }
  }
};


console.log(getNumber());

