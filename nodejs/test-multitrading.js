// @ts-check

const { multithreading } = require("./multithreading.js");

multithreading('./nodejs/measure-performance.js')({
    url: 'http://localhost:3000/concat-strings',
    method: 'POST',
    data: [['a', 'b'], ['asdfsdfdsf', 'sdfsdfdsf']],
}).then(console.log);