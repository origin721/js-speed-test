const http = require('http');
const { multithreading } = require("./multithreading.js");

const sumArray = multithreading('./nodejs/modules/sum-array.js')
const concatStrings = multithreading('./nodejs/modules/concat-strings.js')
const analyzeUsers = multithreading('./nodejs/modules/analyze-users.js')

// Указываем порт
const PORT = 3000;

// const conters = {
//     req: 0,
//     res: 0,
// }
// setInterval(() => console.log(conters), 1000)

/**
 * Функция-обработчик запросов
 * @type {http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse>}
 */
const requestHandler = async (req, res) => {
    // ++conters.req;
    try {

        switch (req.url) {
            case '/hello-world': {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Hello, World!');
                return;
            }
            case '/array-sum': {
                if (req.method === 'POST') {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end((await sumArray(await getJsonBody(req))).toString());
                    return;
                }
            }
            case '/concat-strings': {
                if (req.method === 'POST') {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(await concatStrings(await getJsonBody(req)));
                    return;
                }
            }
            case '/analyze-users': {
                if (req.method === 'POST') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    const result = JSON.stringify(await analyzeUsers(await getJsonBody(req)));
                    res.end(result);
                    return;
                }
            }
        }

        res.writeHead(404);
        res.end();
    }
    catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end();
    }
    // finally {
    //     ++conters.res;
    // }
};

// Создание сервера
const server = http.createServer(requestHandler);

// Запуск сервера на указанном порту
server.listen(PORT, (err) => {
    if (err) {
        return console.log('Ошибка при запуске сервера:', err);
    }
    console.log(`Сервер запущен на порту ${PORT}`);
});



// Асинхронная функция для получения тела JSON из POST запроса
function getJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const json = JSON.parse(body);
                resolve(json);
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });

        req.on('error', error => {
            reject(error);
        });
    });
};