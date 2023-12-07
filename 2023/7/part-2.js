const fs = require('fs');
const input = fs.readFileSync('input.txt').toString('utf-8').trim().split('\n');

function remapCard(card) {
  switch (card) {
    case 'T':
      return 'a';
    case 'J':
      return '1';
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
  let cardWithMostOccurrences = Object.keys(occurrences)[0];

  for (const [key, value] of Object.entries(occurrences)) {
    if (key === 'J') {
      continue;
    }

    if (value > occurrences[cardWithMostOccurrences]) {
      cardWithMostOccurrences = key;
    }
  }

  const jokerOccurrences = occurrences['J'] ?? 0;
  occurrences[cardWithMostOccurrences] += jokerOccurrences;
  occurrences['J'] = (occurrences['J'] ?? 0) - jokerOccurrences;

  return Object.values(occurrences).sort().reverse().join('').replace('0', '');
}

/**
 * @type {{hand: string, bid: string, handType: string}[]}
 */
const hands = [];

for (const line of input) {
  const [hand, bid] = line.split(' ');
  const occurrences = {};

  for (const card of hand) {
    occurrences[card] = [...hand].filter(v => v === card).length;
  }

  hands.push({
    originalHand: hand,
    hand: hand.split('').map(remapCard).join(''),
    bid,
    handType: getHandType(occurrences),
  });
}

const rankedHands = hands.sort((a, b) => {
  return a.handType.localeCompare(b.handType) || a.hand.localeCompare(b.hand);
});

console.log(rankedHands);

const totalWinnings = rankedHands.reduce((sum, hand, index) => {
  return sum + hand.bid * (index + 1);
}, 0);

console.log(totalWinnings);
