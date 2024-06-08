// @ts-check
import connectChildМultithreading from "../multithreading.js";


connectChildМultithreading(sumArray);

function sumArray(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}