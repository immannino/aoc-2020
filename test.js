const fs = require('fs');
const data = fs.readFileSync('./data/day6.txt', 'utf-8');

const inputs = data.split('\n\n');

let count = 0;

for (let line of inputs) {
    let charMap = {};
    line.split('\n').join('').split('').forEach((char) => {
        if (!charMap[char]) {
            charMap[char] = 1;
        }
    });

    count += Object.keys(charMap).length
}

console.log(`Part 1: ${count}`);


count = 0;

for (let line of inputs) {
    const groupSize = line.split('\n').length;

    let charMap = {};

    line.split('\n').join('').split('').forEach((char) => charMap[char] ? charMap[char] += 1 : charMap[char] = 1);

    const yesQuestions = Object.values(charMap).filter((count) => count >= groupSize);

    count += yesQuestions.length;
}

console.log(`Part 2: ${count}`);