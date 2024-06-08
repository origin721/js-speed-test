// @ts-check
import { multithreading } from './multithreading.js';
import { readFileSync } from 'fs';

// const listString = JSON.parse(readFileSync('./tmp/string-array.json', 'utf8'));
// const listNumber = JSON.parse(readFileSync('./tmp/number-array.json', 'utf8'));

const dateStart = Date.now();
const listPromises = [];

/**
 * @type {any}
 */
const measurePostPerformance = multithreading('./measurePostPerformance.js');

//measurePostPerformance();
listPromises.push(measurePostPerformance({
  url: 'http://localhost:3000/concat-strings',
  method: 'POST',
  data: [['a','b'],['asdfsdfdsf','sdfsdfdsf']],
}));

listPromises.forEach(el => el.then(console.log))

//listPromises.push(itemRun({listNumber:[[1,2]], listString: [['sdf','sdf']]}));
// listPromises.push(multithreading('./chield-test3.js')({listNumber, listString}));
// listPromises.push(multithreading('./chield-test3.js')({listNumber, listString}));
// listPromises.push(multithreading('./chield-test3.js')({listNumber, listString}));
// listPromises.push(multithreading('./chield-test3.js')({listNumber, listString}));
// listPromises.push(multithreading('./chield-test3.js')({listNumber, listString}));

Promise.all(listPromises).then(() => {
  console.log();
  console.log('Всего времени:' + (Date.now() - dateStart));
});
