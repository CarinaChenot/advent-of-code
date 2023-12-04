const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();
const cards = input.split('\n');

let totalCardPoints = 0;

for (const card of cards) {
  let cardPoints = 0;

  const [[_, w, n]] = card.matchAll(/((?:\d*\s+)+)\|((?:\d*\s*)+)/g);

  const winNumbers = w.split(' ').filter(Boolean);
  const numbers = n.split(' ').filter(Boolean);

  for (const number of numbers) {
    if (winNumbers.includes(number)) {
      cardPoints = cardPoints * 2 || 1;
    }
  }

  totalCardPoints += cardPoints;
}

console.log(totalCardPoints);
