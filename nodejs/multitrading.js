//@ts-check
const { createLog, log } = require("./create-log.js");

const { fork } = require('child_process');

module.exports = {
    multitrading,
    connectChildMultitrading,
}


function multitrading(path) {
    return (args) => {
        return new Promise((resolve, reject) => {
            const child = fork(path);

            child.on('message', (message) => {
                resolve(message);
            });

            child.on('error', (error) => {
                reject(error);
            });

            child.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Child process exited with code ${code}`));
                }
            });

            // Отправка аргументов дочернему процессу
            child.send(args);
        });
    }
}

function connectChildMultitrading(callback) {
    process.on('message', async (args) => {
        try {
            // Обработка аргументов и добавление нового поля
            const result = await callback(args);

            // Отправка результата обратно родительскому процессу
            process.send(result);

        }
        catch (err) {
            process.send(null);
            console.error(__filename, callback.name, {args}, err)
        }
        finally {
            process.exit(0);
        }

    });
}