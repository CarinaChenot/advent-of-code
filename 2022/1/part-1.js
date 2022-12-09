const fs = require('fs');

const contents = fs.readFileSync('input.txt').toString('utf-8').trim();

let mostCalories = 0;

contents.split('\n\n').forEach((elfInventory) => {
  const totalCalories = elfInventory.split('\n')
    .reduce((sum, currentValue) => sum + parseInt(currentValue), 0);

  if (totalCalories > mostCalories) {
    mostCalories = totalCalories
  }
});

console.log(mostCalories);
