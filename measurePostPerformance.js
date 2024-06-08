import { writeFile } from "fs";

// Пример использования функции
const logToFile = createLog('log.txt');
logToFile('Это сообщение лога');
logToFile('Это второе сообщение лога');

export async function measurePostPerformance({
    url,
    method,
    data
}) {
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

    return {
        request: url + method,
        totalRequests: data.length,
        totalTime,
        averageTime
    };
}

// Прослушивание ввода от родительского процесса
process.stdin.on("data", (data) => {
    logToFile(JSON.stringify(data))
    const { requestId, args } = JSON.parse(data.toString());
    measurePostPerformance(args).then((result) => {
        logToFile(JSON.stringify(result))
        process.stdout.write(JSON.stringify({ requestId, result }));
    });

});

process.stdin.on("end", () => {
    process.exit(0);
});





function createLog(filePath) {
    return (logText) => {
        try {
            // Добавление текста в конец файла
            writeFile(filePath, logText + '\n', { append: true });
        } catch (err) {
            console.error(`Ошибка при записи в файл ${filePath}:`, err);
        }
    };
}

