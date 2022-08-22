
const fs = require('fs');

let namesList = fs.readFileSync('1212-names-input.txt').toString().split('\r\n').filter(x => x);
let runningTotal = 0;
for (let i = 0; i < namesList.length; i++) {
  const name = namesList[i];
  let nameTotal = 0;
  for (let j = 0; j < name.length; j++) {
    nameTotal+= name.charCodeAt(j);
  }
  runningTotal += nameTotal * (i + 1);
  console.log (`Person ${name} gets value ${nameTotal} (times ${i + 1}) and brings the total to ${runningTotal} `);
}
console.log (`***********FINISHED WITH ${runningTotal}`);
