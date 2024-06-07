import { spawn } from "bun";

let currentId = 0;

export function multithreading(filePath) {
  return function (args) {
    return new Promise((resolve, reject) => {
      const requestId = currentId++;
      const child = spawn({
        cmd: ["bun", filePath],
        stdio: ["pipe", "pipe", "pipe"]
      });

      // Отправка идентификатора запроса и аргументов в дочерний процесс
      child.stdin.write(JSON.stringify({ requestId, args }));
      child.stdin.end();

      let output = '';
      let errorOutput = '';

      const decoder = new TextDecoder();

      // Чтение данных из stdout потока
      child.stdout.pipeTo(new WritableStream({
        write(chunk) {
          output += decoder.decode(chunk);
        }
      }));

      // Чтение данных из stderr потока
      child.stderr.pipeTo(new WritableStream({
        write(chunk) {
          errorOutput += decoder.decode(chunk);
        }
      }));

      child.exited.then(() => {
        if (errorOutput) {
          reject(new Error(errorOutput));
        } else {
          const response = JSON.parse(output);
          if (response.requestId === requestId) {
            resolve(response.result);
          } else {
            reject(new Error("Mismatched request ID"));
          }
        }
      }).catch(reject);
    });
  };
}
