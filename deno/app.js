import { multithreading } from "./multithreading.js";

const sumArray = await multithreading('./deno/modules/sum-array.js');
const concatStrings = await multithreading('./deno/modules/concat-strings.js');

// Указываем порт
const PORT = 3000;

// Асинхронная функция для получения тела JSON из POST запроса
async function getJsonBody(req) {
  const body = await req.text();
  try {
    return JSON.parse(body);
  } catch {
    throw new Error('Invalid JSON');
  }
}

// Функция-обработчик запросов
async function requestHandler(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const pathname = url.pathname;

    switch (pathname) {
      case '/hello-world': {
        return new Response('Hello, World!', { status: 200, headers: { 'Content-Type': 'text/plain' } });
      }
      case '/array-sum': {
        if (req.method === 'POST') {
          const body = await getJsonBody(req);
          const result = await sumArray(body);
          return new Response(result.toString(), { status: 200, headers: { 'Content-Type': 'text/plain' } });
        }
        break;
      }
      case '/concat-strings': {
        if (req.method === 'POST') {
          const body = await getJsonBody(req);
          const result = await concatStrings(body);
          return new Response(result, { status: 200, headers: { 'Content-Type': 'text/plain' } });
        }
        break;
      }
      default: {
        return new Response(null, { status: 404 });
      }
    }
  } catch (err) {
    console.error(err);
    return new Response(null, { status: 500 });
  }
}

// Создание и запуск сервера
console.log(`Сервер запущен на порту ${PORT}`);
Deno.serve(requestHandler, { port: PORT });