// @ts-check
import { mkdirSync, readdirSync } from "fs";

// Функция для проверки существования папки и её создания при необходимости
export function isNotExistCreateFolder(dirPath) {
  try {
    // Попытка чтения содержимого директории
    readdirSync(dirPath);
    console.log(`Папка ${dirPath} уже существует.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Если директория не существует, создаём её
      try {
        mkdirSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} успешно создана.`);
      } catch (mkdirErr) {
        console.error(`Ошибка при создании папки ${dirPath}:`, mkdirErr);
      }
    } else {
      console.error(`Ошибка при проверке папки ${dirPath}:`, err);
    }
  }
};
