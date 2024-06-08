// @ts-check

/**
 * Создает объект с управляемым обещанием (Promise).
 * @returns {{ promise: Promise<any>, resolve: () => void, reject: () => void }}
 *          Объект, содержащий обещание и функции для его разрешения или отклонения.
 */
function createDeferred() {
    let resolve, reject;
    
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        promise,
        resolve,
        reject
    };
}

module.exports = {
    createDeferred,
}