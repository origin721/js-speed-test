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
  console.log(await measurePostPerformance(
    'http://localhost:3000/hello-world',
    'GET',
    Array.from({length: 100000}).fill(),
  ));

  console.log(await measurePostPerformance(
    'http://localhost:3000/concat-strings',
    'POST',
    JSON.parse(readFileSync('./tmp/string-array.json', 'utf8')),
  ));

  console.log(await measurePostPerformance(
    'http://localhost:3000/array-sum',
    'POST',
    JSON.parse(readFileSync('./tmp/number-array.json', 'utf8')),
  ));
}

