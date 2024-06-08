// @ts-check
import { writeFileSync } from 'fs';
import {isNotExistCreateFolder} from './is-not-exist-create-folder';

isNotExistCreateFolder('./tmp');

// Пример использования:
const config = {
  minValue: -1999,
  maxValue: 1999,
  numRows: 400,
  numCols: 400000,
  filePath: './tmp/number-array.json' // изменен путь файла на .json
};

write2DArrayToFile(config);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate2DArray({ minValue, maxValue, numRows, numCols }) {
  const array = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(generateRandomNumber(minValue, maxValue));
    }
    array.push(row);
  }
  return array;
}

function write2DArrayToFile({ filePath, minValue, maxValue, numRows, numCols }) {
  const array = generate2DArray({ minValue, maxValue, numRows, numCols });
  const jsonData = JSON.stringify(array, null, 2); // форматирование JSON
  writeFileSync(filePath, jsonData, 'utf8');
}

console.log(`Двумерный массив чисел записан в файл ${config.filePath}`);
