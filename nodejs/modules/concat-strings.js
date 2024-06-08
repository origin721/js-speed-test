// @ts-check
const { connectChildМultithreading } = require("../multithreading.js");


connectChildМultithreading(concatStrings);

function concatStrings(list) {
    return list.join(' + ');
}