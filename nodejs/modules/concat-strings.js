// @ts-check
const { connectChildMultithreading } = require("../multithreading.js");


connectChildMultithreading(concatStrings);

function concatStrings(list) {
    return list.join(' + ');
}