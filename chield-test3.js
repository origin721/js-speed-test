// @ts-check
//test3({listNumber: [[2]], listString:[['a']]});
export async function test3({
  listString,
  listNumber,
}) {
  await measurePostPerformance(
    'http://localhost:3000/hello-world',
    'GET',
    Array.from({length: 100000}).fill(undefined),
  );

  return 0;
}

// Прослушивание ввода от родительского процесса
process.stdin.on("data", async(data) => {
  const { requestId, args } = JSON.parse(data.toString());
  const result = await test3(args);
  process.stdout.write(JSON.stringify({ requestId, result }));
});

process.stdin.on("end", () => {
  process.exit(0);
});



