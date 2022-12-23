const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8');
let i = 0;

const MONKEY_NUMBER_REGEX = /[a-z]{4}: \d+$/m;
const MONKEY_EXPRESSION_REGEX = /\d+ [\*\+/-] \d+/;

while (!content.match(/root: \d+$/m)) {
  i++;
  const matchMonkeyNumber = content.match(MONKEY_NUMBER_REGEX);

  if (matchMonkeyNumber) {
    const [monkey, number] = matchMonkeyNumber[0].split(': ');
    content = content.replaceAll(new RegExp(`${monkey}(?!:)`, "g"), number);
    content = content.replace(new RegExp(`${monkey}: \\d+\n`), '');
    continue;
  }

  const matchMonkeyExpression = content.match(MONKEY_EXPRESSION_REGEX);

  if (matchMonkeyExpression) {
    const expression = matchMonkeyExpression[0]
    content = content.replace(expression, eval(expression));
  }
}

console.log(content)
