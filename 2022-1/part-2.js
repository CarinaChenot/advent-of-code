const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const versionOne = () => {
  const totalCaloriesTopThreeElves = contents.split('\n\n')
    .map((elfInventory) => elfInventory.split('\n')
      .reduce((sum, currentValue) => sum + parseInt(currentValue)
        , 0))
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((sum, currentValue) => sum + currentValue, 0);

  console.log('version 1:', totalCaloriesTopThreeElves);
}

const versionTwo = () => {
  const totalCaloriesTopThreeElves = [0, 0, 0];

  contents.split('\n\n').forEach((elfInventory) => {
    const total = elfInventory.split('\n')
      .reduce((sum, currentValue) => sum + parseInt(currentValue), 0);

    for (let i = 0; i < totalCaloriesTopThreeElves.length; i++) {
      if (total > totalCaloriesTopThreeElves[i]) {
        totalCaloriesTopThreeElves.splice(i, 0, total);
        totalCaloriesTopThreeElves.pop();
        break;
      }
    }

    const result = totalCaloriesTopThreeElves.reduce((sum, currentValue) => sum + currentValue, 0)

    console.log('version 2:', result);
  });
}

versionOne()
versionTwo()


