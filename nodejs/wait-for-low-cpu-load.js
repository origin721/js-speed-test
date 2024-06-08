// @ts-check
const os = require('os');

module.exports = {
    waitForLowCpuLoad,
}

/**
 * Возвращает промис, который разрешается, когда загрузка всех ядер процессора становится меньше 90%.
 * Если загрузка уже меньше 90%, возвращает undefined.
 * @param {number} intervalMs - Интервал проверки в миллисекундах.
 * @returns {Promise<void> | undefined} - Промис или undefined.
 */
function waitForLowCpuLoad(intervalMs) {
    if (!isCpuLoadHigh()) {
        return undefined;
    }

    return new Promise((resolve) => {
        const checkCpuLoad = () => {
            if (!isCpuLoadHigh()) {
                resolve();
            } else {
                setTimeout(checkCpuLoad, intervalMs);
            }
        };

        setTimeout(checkCpuLoad, intervalMs);
    });
}

/**
 * Проверяет, если загрузка всех ядер процессора больше 90%.
 * @returns {boolean} - true если загрузка всех ядер больше 90%, иначе false.
 */
function isCpuLoadHigh() {
    const cpus = os.cpus();
    return cpus.every(cpu => {
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
        const idle = cpu.times.idle;
        const usage = 1 - idle / total;
        return usage > 0.9;
    });
}
