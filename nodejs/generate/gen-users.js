const fs = require('fs');
const path = require('path');


// Массивы с именами и фамилиями
const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivan", "Judy"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Hernandez"];



const numUsers = 200; // Укажите количество пользователей
const users = generateUsers(numUsers);
const filePath = './tmp/users.json';
saveUsersToFile(users, filePath);



function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsers(numUsers) {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const user = {
            name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
            age: Math.floor(Math.random() * 100) // Возраст случайным образом от 0 до 99
        };
        users.push(user);
    }
    return users;
}

function saveUsersToFile(users, filePath) {
    // Создание директорий, если они не существуют
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(filePath, data, 'utf8');
    console.log(`Data has been written to ${filePath}`);
}
