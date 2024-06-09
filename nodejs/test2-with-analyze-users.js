// @ts-check

const { multithreading } = require("./multithreading.js");
const { readJsonFile } = require("./read-json-file.js");
//const {measurePerformance} = require('./measure-performance.js');

const measurePerformance = multithreading('./nodejs/measure-performance.js')

const hostServer = 'http://localhost:3000'

main();

async function main() {
    const listNumbers = await readJsonFile('./tmp/number-array.json');
    const listString = await readJsonFile('./tmp/string-array.json');
    const listUsers = await readJsonFile('./tmp/users.json');

    // console.log(listNumbers)

    console.log('params is readed');

    const dateStart = Date.now();
    const listPromises = [];

    console.log(await measurePerformance({
        url: hostServer + '/hello-world',
        method: 'GET',
        data: Array.from({ length: 1000 }).fill(undefined),
    }));

    console.log()
    console.log('asyncMultiRequest');

    let resolve;
    const promise = new Promise((res) => {
        resolve = res;
    });
    function resolveRequest() {
        --counterResolve;
        // console.log({counterResolve})
        if (counterResolve === 0) resolve();
    }


    const jLength = 3;
    let counterResolve = jLength * 4; // jLength * countSetTimeout

    for (let j = 0; j < jLength; ++j) {

        setTimeout(async () => {
            for (let i = 0; i < 70; ++i) {
                const localPromises = [];
                localPromises.push(measurePerformance({
                    url: hostServer + '/hello-world',
                    method: 'GET',
                    data: Array.from({ length: 100 }).fill(undefined),
                }));
                localPromises.forEach(el => el.then(console.log))
                listPromises.concat(localPromises);
                await Promise.allSettled(localPromises)
            }
            resolveRequest();
        })

        setTimeout(async () => {
            for (let i = 0; i < 40; ++i) {
                const localPromises = [];
                localPromises.push(measurePerformance({
                    url: hostServer + '/concat-strings',
                    method: 'POST',
                    data: listString,
                }));
                localPromises.forEach(el => el.then(console.log))
                listPromises.concat(localPromises);
                await Promise.allSettled(localPromises)
            }
            resolveRequest();
        })

        setTimeout(async () => {
            for (let i = 0; i < 40; ++i) {
                const localPromises = [];
                localPromises.push(measurePerformance({
                    url: hostServer + '/array-sum',
                    method: 'POST',
                    data: listNumbers,
                }));
                localPromises.forEach(el => el.then(console.log))
                listPromises.concat(localPromises);
                await Promise.allSettled(localPromises)
            }
            resolveRequest();
        })

        setTimeout(async () => {
            for (let i = 0; i < 40; ++i) {
                const localPromises = [];
                localPromises.push(measurePerformance({
                    url: hostServer + '/analyze-users',
                    method: 'POST',
                    data: listUsers,
                }));
                localPromises.forEach(el => el.then(console.log))
                listPromises.concat(localPromises);
                await Promise.allSettled(localPromises)
            }
            resolveRequest();
        })
    }

    //listPromises.forEach(el => el.then(console.log))

    await promise;

    Promise.all(listPromises).then(() => {
        console.log();
        console.log('Всего времени:' + (Date.now() - dateStart));
    });
}

