// @ts-check
import connectChildMultithreading from "../multithreading.js";


connectChildMultithreading(sumArray);

function sumArray(numbers) {
    //return Array.from({length: 99999999}).fill(1111)
    return numbers.reduce((acc, num) => acc + num, 0);
}