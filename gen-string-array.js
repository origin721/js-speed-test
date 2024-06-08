import { writeFileSync } from 'fs';


const config = {
  minLength: 5,
  maxLength: 1000,
  numRows: 400,
  numCols: 400,
  filePath: './tmp/string-array.json' // изменен путь файла на .json
};

write2DArrayToFile(config);

function generateRandomString(minLength, maxLength) {
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generate2DArray({ minLength, maxLength, numRows, numCols }) {
  const array = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(generateRandomString(minLength, maxLength));
    }
    array.push(row);
  }
  return array;
}

function write2DArrayToFile({ filePath, minLength, maxLength, numRows, numCols }) {
  const array = generate2DArray({ minLength, maxLength, numRows, numCols });
  const jsonData = JSON.stringify(array, null, 2); // форматирование JSON
  writeFileSync(filePath, jsonData, 'utf8');
}

console.log(`Двумерный массив строк записан в файл ${config.filePath}`);

