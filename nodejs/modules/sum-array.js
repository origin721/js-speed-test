// @ts-check
const { connectChildMultitrading } = require("../multitrading.js");


connectChildMultitrading(sumArray);

function sumArray(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}