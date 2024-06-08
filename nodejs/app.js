const http = require('http');
const { multitrading } = require("./multitrading.js");

const sumArray = multitrading('./nodejs/modules/sum-array.js')
const concatStrings = multitrading('./nodejs/modules/concat-strings.js')

// Указываем порт
const PORT = 3000;

/**
 * Функция-обработчик запросов
 * @type {http.RequestListener<typeof http.IncomingMessage, typeof http.ServerResponse>}
 */
const requestHandler = async (req, res) => {
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
    }

    res.writeHead(404);
    res.end();
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