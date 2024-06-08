// @ts-check

const { createLog, log } = require("./create-log.js");


const { connectChildMultitrading } = require("./multitrading.js");

module.exports = {
    measurePerformance
}



connectChildMultitrading(measurePerformance);

async function measurePerformance({
    url,
    method,
    data
}) {
    const start = Date.now();
    const requests = data.map(item => {
        if (method === 'GET') {
            return fetch(url, {
                method: method,
            })
        }
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

    const result = {
        request: method + '_' + url,
        totalRequests: data.length,
        totalTime,
        averageTime
    };
    return result
}



