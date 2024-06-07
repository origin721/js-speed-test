// Функция для вычисления суммы чисел в массиве
export default function sumArray(list) {
  return list.join(' + ');
}

// Прослушивание ввода от родительского процесса
process.stdin.on("data", (data) => {
  const { requestId, args } = JSON.parse(data.toString());
  const result = sumArray(args);
  process.stdout.write(JSON.stringify({ requestId, result }));
});

process.stdin.on("end", () => {
  process.exit(0);
});

