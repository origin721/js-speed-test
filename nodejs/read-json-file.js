// @ts-check
const fs = require('fs');
const { Transform } = require('stream');
const path = require('path');
const readline = require('readline');

module.exports = {
    readJsonFile,
}

async function readJsonFile(filePath) {
    try {
        //const data = await fs.promises.readFile(filePath, 'utf8');
        const data = await readFileInBatches(filePath, 100000);
        const jsonData = JSON.parse(data);
        //console.log('JSON данные:', jsonData);
        return jsonData;
    } catch (err) {
        console.error(`Ошибка при чтении файла ${filePath}:`, err);
    }
};



/**
 * Асинхронная функция для чтения всего файла по частям и склеивания его содержимого
 * @param {string} filePath - Путь к файлу
 * @param {number} numLinesPerBatch - Количество строк в каждой части
 * @returns {Promise<string>} - Промис, который разрешается строкой с содержимым всего файла
 */
async function readFileInBatches (filePath, numLinesPerBatch) {
    let startLine = 0;
    let fileContent = '';
    let lines;

    do {
        lines = await readLines(filePath, startLine, numLinesPerBatch);
        fileContent += lines.join('\n') + '\n';
        startLine += numLinesPerBatch;
    } while (lines.length === numLinesPerBatch);

    return fileContent;
};

/**
 * Асинхронная функция для чтения n строк из файла начиная с определенной строки
 * @param {string} filePath - Путь к файлу
 * @param {number} startLine - Номер начальной строки
 * @param {number} numLines - Количество строк для чтения
 * @returns {Promise<string[]>} - Промис, который разрешается массивом строк
 */
function readLines (filePath, startLine, numLines) {
    return new Promise((resolve, reject) => {
        const inputStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const rl = readline.createInterface({
            input: inputStream,
            crlfDelay: Infinity
        });

        const lines = [];
        let lineCount = 0;

        rl.on('line', (line) => {
            lineCount++;
            if (lineCount > startLine && lineCount <= startLine + numLines) {
                lines.push(line);
            }
            if (lineCount === startLine + numLines) {
                rl.close();
            }
        });

        rl.on('close', () => resolve(lines));
        rl.on('error', (err) => reject(err));
    });
};
