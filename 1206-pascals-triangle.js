function computeNextRow(rowPrev, rowMax) {  
  if (rowPrev.length <= rowMax) {
    const rowCurrent = createNewRowWithValues(rowPrev);
    printRow(rowCurrent);
    computeNextRow(rowCurrent, rowMax);
  }
}

function computeNextRowUpTo(rowPrev, stopWhenThisNumberAppears) { 
  
  const rowCurrent = createNewRowWithValues(rowPrev);
  if (rowCurrent.find(el => el >= stopWhenThisNumberAppears)) {
    const rowMax = Math.max(...rowCurrent);
    console.log(`Row ${rowCurrent.length - 1} went over your target ${stopWhenThisNumberAppears} and the biggest number was ${rowMax}`);
  } else {
    computeNextRowUpTo(rowCurrent, stopWhenThisNumberAppears);
  }

}

function createNewRowWithValues(rowPrev) {
  let rowCurr = new Array(rowPrev.length + 1);
  for(let i = 0; i < rowCurr.length; i++) {
    rowCurr[i] = getAboveLeft(rowPrev, i) + getAboveRight(rowPrev, i);
  }
  return rowCurr;
}

function getAboveLeft(rowPrev, colIndex) {
  if (colIndex == 0) {
    return 0;
  } else {
    return rowPrev[colIndex - 1];
  }
}

function getAboveRight(rowPrev, colIndex) {
  if (colIndex == rowPrev.length) {
    return 0;
  } else {
    return rowPrev[colIndex];
  }
}

function printRow(row) {
  console.log(`Row ${row.length - 1} has values: ${row.join(',')}`);
}

console.log('hello world');


computeNextRow([1], 13);

computeNextRowUpTo([1],1000000000);
