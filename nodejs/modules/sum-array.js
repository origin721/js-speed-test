// @ts-check
const { connectChildMultithreading } = require("../multithreading.js");


connectChildMultithreading(sumArray);

function sumArray(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}