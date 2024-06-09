// @ts-check
import { connectChildMultithreading } from "../multithreading.js";


connectChildMultithreading(analyzeUsers);

/**
 * 
 * @param {Users[]} users 
 * @returns 
 * @typedef {Object} Users
 * @typedef {string} Users.name
 * @typedef {number} Users.age
 */
function analyzeUsers(users) {
    const names = [];
    let minAge = Infinity;
    let maxAge = -Infinity;
    let minAgeUser = null;
    let maxAgeUser = null;

    // Обработка данных в одном цикле
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.age > 18) {
            names.push(user.name);

            if (user.age < minAge) {
                minAge = user.age;
                minAgeUser = user;
            }

            if (user.age > maxAge) {
                maxAge = user.age;
                maxAgeUser = user;
            }
        }
    }

    return {
        names,
        minAge,
        maxAge,
        minAgeUser,
        maxAgeUser
    };
}