bun ./gen-number-array.js

bun ./gen-string-array.js

# start http server

## bun

bun ./index.js

## node

node ./nodejs/app.js

## deno

deno run --allow-net ./deno/app.js

# actual use test

node ./nodejs/test1.js

# Если хотя бы 1 клиенский запрос упал
Если запросов слишком много то тест не валидный 

в файле nodejs/test1.js измените 45 сточку
```
for (let j = 0; j < 6; ++j) {
```