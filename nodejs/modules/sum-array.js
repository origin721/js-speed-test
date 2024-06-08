// @ts-check
const { connectChildМultithreading } = require("../multithreading.js");


connectChildМultithreading(sumArray);

function sumArray(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}