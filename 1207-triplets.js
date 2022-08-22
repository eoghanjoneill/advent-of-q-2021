
const fs = require('fs');

let inputData = fs.readFileSync('1207-triplets2.txt').toString();
let charArray = inputData.split('');

let doublePrevious = undefined;
let previous = undefined
let tripletCount = 0;
for (let i = 0; i <charArray.length; i++) {
  if (charArray[i] === previous && previous === doublePrevious) {
    tripletCount++;
  }
  doublePrevious = previous;
  previous = charArray[i];
}
console.log (`In this ${charArray.length} string there are ${tripletCount} triplets: `);
/*
const uniqueValues = [...new Set(charArray)];
let countArray = new Array(uniqueValues.length);

charArray.forEach(char => {
  let charIndex = uniqueValues.indexOf(char);
  countArray[charIndex] = countArray[charIndex] ? ++countArray[charIndex] : 1;
});


let tripletCount = countArray.filter(x=> x === 3).length;
const tripletIndices = new Array(tripletCount);
const tripletChars = new Array(tripletCount);
let nextIndex = 0;
countArray.forEach((x, index) => {
  if (x === 3) {
    tripletIndices[nextIndex] = index;
    tripletChars[nextIndex] = uniqueValues[index];
    nextIndex++;
  }
});
console.log (`In this ${charArray.length} string there are ${tripletCount} triplets: `);
console.log(tripletChars.join(','));*/
