//@ts-check
const { fork, ChildProcess } = require('child_process');
const os = require('os');
const { removeArray } = require('./remove-array');
const { waitForLowCpuLoad } = require('./wait-for-low-cpu-load');

const numCPUs = Math.max(os.cpus().length - 1, 1) + 1;

module.exports = {
    multithreading,
    connectChildMultithreading,
}

let lastId = 0;

function getId() {
    return ++lastId;
};

let requestCounter = 0;

/**
 * @type {Array<WorkerCtrl>}
 * @typedef {Object} WorkerCtrl
 * @prop {ChildProcess} WorkerCtrl.worker
 * @prop {number} WorkerCtrl.taskCount
 * @prop {Record<string, Function>} WorkerCtrl.resolveById
 * @prop {Record<string, Function>} WorkerCtrl.rejectById
 */
const workersCtrl = [];

function multithreading(path) {
    return async (args) => {
        ++requestCounter;
        const idRequest = getId();
        // console.log('start', idRequest, requestCounter);

        //await waitForLowCpuLoad(300);

        return new Promise((resolve, reject) => {
            /**
             * @type {WorkerCtrl}
             */
            let workerCtlItem;
            const isNewWorker = workersCtrl.length < numCPUs;
            if (isNewWorker) {
                workerCtlItem = {
                    worker: fork(path),
                    taskCount: 1,
                    resolveById: {},
                    rejectById: {},
                }
                workersCtrl.push(workerCtlItem);
            } else {
                workerCtlItem = workersCtrl.reduce((leastLoaded, current) =>
                    current.taskCount < leastLoaded.taskCount ? current : leastLoaded
                );
                ++workerCtlItem.taskCount;
            }

            // console.log('end', requestCounter, workerCtlItem.taskCount);

            if (isNewWorker) {
                workerCtlItem.worker.on('message', (response) => {
                    const msgReqId = response.idRequest;

                    // if (!msgReqId || !workerCtlItem.resolveById[msgReqId]) {
                    //     console.log('Не нашёл idRequest Resolve: ', msgReqId);
                    //     return;
                    // }

                    workerCtlItem.resolveById[msgReqId](response.result);
                });

                workerCtlItem.worker.on('error', (error) => {
                    //reject(error);// TODO: reject не тот
                    console.error(__filename, error);
                    onProcessCompletion();
                });

                workerCtlItem.worker.on('exit', (code) => {
                    if (code !== 0) {
                        onProcessCompletion();
                        console.error(__filename, `Child process exited with code ${code}`);
                        //reject(new Error(`Child process exited with code ${code}`));
                    }
                });
            }

            workerCtlItem.resolveById[idRequest] = (value) => {
                onProcessCompletion();
                // console.log('deleted idRequest', idRequest);
                resolve(value);
                delete workerCtlItem.resolveById[idRequest];
                delete workerCtlItem.rejectById[idRequest];
            };

            // console.log('created idRequest', idRequest);

            // Отправка аргументов дочернему процессу
            workerCtlItem.worker.send({ args, idRequest });

            function onProcessCompletion() {
                --requestCounter;
                --workerCtlItem.taskCount;
                //console.log('end', requestCounter, workerCtlItem.taskCount);
                if (workerCtlItem.taskCount === 0) {
                    for (let key in workerCtlItem.rejectById) {
                        workerCtlItem.rejectById[key]();
                        delete workerCtlItem.resolveById[idRequest];
                        delete workerCtlItem.rejectById[idRequest];
                    }
                    removeArray(workersCtrl, workerCtlItem);
                    workerCtlItem.worker.send({ isExit: true });
                }
            }
        });
    }
}

function connectChildMultithreading(callback) {
    process.on('message', async ({ args, idRequest, isExit, responseOk }) => {
        if (isExit) return process.exit(0);

        const result = { idRequest };

        try {
            result.result = await callback(args);
            process.send(result);
        } catch (err) {
            console.error(__filename, callback.name, { args }, err);
            process.send(result);
        }
    });
}
