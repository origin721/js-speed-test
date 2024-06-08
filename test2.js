import { readFileSync } from 'fs';

async function measurePostPerformance(url, method, data) {
  const start = Date.now();
  const requests = data.map(item => {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
  });

  await Promise.all(requests);

  const end = Date.now();
  const totalTime = end - start;
  const averageTime = totalTime / data.length;

  console.log();
  console.log(url, method);
  return {
    totalRequests: data.length,
    totalTime,
    averageTime
  };
}


main();
async function main() {
  const dateStart = Date.now();
  const listString = JSON.parse(readFileSync('./tmp/string-array.json', 'utf8'));
  const listNumber = JSON.parse(readFileSync('./tmp/number-array.json', 'utf8'));

  console.log('paramsIsReaded');
  console.log(await measurePostPerformance(
    'http://localhost:3000/hello-world',
    'GET',
    Array.from({length: 100000}).fill(),
  ));

  console.log(await measurePostPerformance(
    'http://localhost:3000/concat-strings',
    'POST',
    listString,
  ));

  console.log(await measurePostPerformance(
    'http://localhost:3000/array-sum',
    'POST',
    listNumber,
  ));

  console.log();
  console.log('Syncrone end');

  const listPromises = [];

  listPromises.push(measurePostPerformance(
    'http://localhost:3000/concat-strings',
    'POST',
    listString,
  ));
  listPromises.push(measurePostPerformance(
    'http://localhost:3000/array-sum',
    'POST',
    listNumber,
  ));
  listPromises.push(measurePostPerformance(
    'http://localhost:3000/concat-strings',
    'POST',
    listString,
  ));

  listPromises.forEach(el => el.then(console.log))

  Promise.all(listPromises).then(() => {
    console.log();
    console.log('Всего времени:' + (Date.now() - dateStart));
  });
}

