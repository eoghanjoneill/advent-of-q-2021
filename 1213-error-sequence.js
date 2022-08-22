const fs = require('fs');

function spliceSlice(str, index) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + str.slice(+index + 1);
}

let sequenceReversed = '3,3,7,7,0,10,9'.split(',').reverse();
let text = '3Bli[wtz!.9;en';

for (let i = 0; i < sequenceReversed.length; i++) {
  text = spliceSlice(text, sequenceReversed[i]);
}

console.log(text);

sequenceReversed = fs.readFileSync('1213-sequence.txt').toString().split(',\r\n').reverse();
text = fs.readFileSync('1213-garbled.txt')


for (let i = 0; i < sequenceReversed.length; i++) {
  text = spliceSlice(text, sequenceReversed[i]);
}

console.log(text);
//sequenceReversed = 

