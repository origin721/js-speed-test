// @ts-check
import { connectChildMultithreading } from "../multithreading.js";


connectChildMultithreading(concatStrings);

function concatStrings(list) {
    //return Array.from({length: 99999999}).fill(1111)
    return list.join(' + ');
}