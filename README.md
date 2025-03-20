bun ./gen-number-array.js

bun ./gen-string-array.js

# start http server

## bun

bun ./index.js

## node

node ./nodejs/app.js

Если кто то случайно забрёл сюда, то nodejs код можно оценить как и rust код но генерация данных для теста вроде была на bun

## deno

deno run --allow-net ./deno/app.js

# actual use test

node ./nodejs/test1.js

# Если хотя бы 1 клиенский запрос упал
Если запросов слишком много, то проц может работать на 100% из за чего fetch может упасть, а тест получится не валидным, это чисто баг ноды

в файле nodejs/test1.js измените 45 сточку на меньшее количество циклов
```
for (let j = 0; j < 6; ++j) {
```
