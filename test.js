async function measureFetchPerformance(numRequests) {
  const start = Date.now();
  const requests = [];

  for (let i = 0; i < numRequests; i++) {
    requests.push(
      fetch('http://localhost:3000/hello-world'));
  }

  await Promise.all(requests);

  const end = Date.now();
  const totalTime = end - start;
  const averageTime = totalTime / numRequests;

  return {
    totalRequests: numRequests,
    totalTime,
    averageTime
  };
}

measureFetchPerformance(100000).then(console.log).catch(console.error);
