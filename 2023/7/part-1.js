const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim().split('\n');

function remapCard(card) {
  switch (card) {
    case 'T':
      return 'a';
    case 'J':
      return 'b';
    case 'Q':
      return 'c';
    case 'K':
      return 'd';
    case 'A':
      return 'e';
    default:
      return card;
  }
}

function getHandType(occurrences) {
  return Object.values(occurrences).sort().reverse().join('');
}

/**
 * @type {{hand: string, bid: string, handType: string}[]}
 */
const hands = [];

for (const line of input) {
  const [hand, bid] = line.split(' ');
  const occurrences = {};
  for (let i = 0; i < hand.length; i++) {
    occurrences[hand[i]] = [...hand].filter(v => v === hand[i]).length;
  }
  hands.push({
    hand: hand.split('').map(remapCard).join(''),
    bid,
    handType: getHandType(occurrences),
  });
}

const rankedHands = hands.sort((a, b) => {
  return a.handType.localeCompare(b.handType) || a.hand.localeCompare(b.hand);
});

const totalWinnings = rankedHands.reduce((sum, currentValue, currentIndex) => {
  return sum + currentValue.bid * (currentIndex + 1);
}, 0);

console.log(totalWinnings);
