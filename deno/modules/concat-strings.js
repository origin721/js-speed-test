// @ts-check
import { connectChildМultithreading } from "../multithreading.js";


connectChildМultithreading(concatStrings);

function concatStrings(list) {
    return list.join(' + ');
}