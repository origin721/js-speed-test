// @ts-check
import connectChildMultitrading from "../multitrading.js";


connectChildMultitrading(sumArray);

function sumArray(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}