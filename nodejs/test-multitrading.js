// @ts-check

const { multitrading } = require("./multitrading.js");

multitrading('./nodejs/measure-performance.js')({
    url: 'http://localhost:3000/concat-strings',
    method: 'POST',
    data: [['a', 'b'], ['asdfsdfdsf', 'sdfsdfdsf']],
}).then(console.log);