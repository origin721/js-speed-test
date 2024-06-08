//@ts-check
const { appendFile } = require("fs");


const log = createLog('./log.txt');

module.exports = {
    createLog,
    log,
}

function createLog(filePath) {
    return (logText) => {
        appendFile(filePath, logText + '\n', (err) => {
            if (err) {
                console.error(`Ошибка при записи в файл ${filePath}:`, err);
            } else {
                //console.log(`Лог добавлен в файл ${filePath}`);
            }
        });
    };
} 