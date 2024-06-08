// @ts-check

module.exports = {
    createDebounce,
}

/**
 * Создает функцию debounce, которая будет выполнена только после определенного времени,
 * если за это время она не была вызвана снова.
 * @param {number} wait - Время в миллисекундах, после которого функция будет выполнена.
 * @returns {Function} - Возвращает новую функцию, которая принимает функцию для вызова с дебаунсом.
 */
function createDebounce(wait) {
    let timeout;

    return function(func) {
        return function(...args) {
            const context = this;

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    };
}
