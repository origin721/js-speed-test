// @ts-check

const { multitrading } = require("./multitrading.js");
const { readJsonFile } = require("./read-json-file.js");

const measurePerformance = multitrading('./nodejs/measure-performance.js')

main();

async function main() {
    const listNumbers = await readJsonFile('./tmp/number-array.json');
    const listString = await readJsonFile('./tmp/string-array.json');
    // console.log(listNumbers)

    console.log('params is readed');

    const dateStart = Date.now();
    const listPromises = [];

    console.log(await measurePerformance({
        url: 'http://localhost:3000/hello-world',
        method: 'GET',
        data: Array.from({ length: 10000 }).fill({}),
    }));

    console.log()
    console.log('asyncMultiRequest');

    let resolve;
    const promise = new Promise((res) => {
        resolve = res;
    });
    function resolveRequest() {
        --counterResolve;
        if(counterResolve === 0) resolve();
    }
    let counterResolve = 3;

    setTimeout(async () => {
        for (let i = 0; i < 4; ++i) {
            const localPromises = [];
            localPromises.push(measurePerformance({
                url: 'http://localhost:3000/concat-strings',
                method: 'POST',
                data: listString,
            }));
            localPromises.forEach(el => el.then(console.log))
            listPromises.concat(localPromises);
            await Promise.all(localPromises)
        }
        resolveRequest();
    })

    setTimeout(async () => {
        for (let i = 0; i < 4; ++i) {
            const localPromises = [];
            localPromises.push(measurePerformance({
                url: 'http://localhost:3000/array-sum',
                method: 'POST',
                data: listNumbers,
            }));
            localPromises.forEach(el => el.then(console.log))
            listPromises.concat(localPromises);
            await Promise.all(localPromises)
        }
        resolveRequest();
    })

    setTimeout(async () => {
        for (let i = 0; i < 4; ++i) {
            const localPromises = [];
            localPromises.push(measurePerformance({
                url: 'http://localhost:3000/hello-world',
                method: 'GET',
                data: Array.from({ length: 10000 }).fill({}),
            }));
            localPromises.forEach(el => el.then(console.log))
            listPromises.concat(localPromises);
            await Promise.all(localPromises)
        }
        resolveRequest();
    })

    //listPromises.forEach(el => el.then(console.log))

    await promise;

    Promise.all(listPromises).then(() => {
        console.log();
        console.log('Всего времени:' + (Date.now() - dateStart));
    });
}

