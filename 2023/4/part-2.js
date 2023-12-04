const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim();
const cards = input.split('\n');

const totalCards = {};

for (const card of cards) {
  const [[_, currentCard, w, n]] = card.matchAll(/(\d+):\s+((?:\d*\s+)+)\|((?:\d*\s*)+)/g);

  // Add original card
  totalCards[currentCard] = (totalCards[currentCard] || 0) + 1;

  const winNumbers = w.split(' ').filter(Boolean);
  const numbers = n.split(' ').filter(Boolean);

  const amountOfMatchingNumbers = numbers.filter(nb => winNumbers.includes(nb)).length;

  for (let nextCard = +currentCard + 1; nextCard < amountOfMatchingNumbers + +currentCard + 1; nextCard++) {
    totalCards[nextCard] = (totalCards[nextCard] || 0) + totalCards[currentCard];
  }
}

console.log(Object.values(totalCards).reduce((sum, v) => sum + v));
