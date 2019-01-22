# KassBox-Server
Серверная часть проекта по учету движения ДС

> A Node-js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build
```
Клиентская часть этого проекта находиться по ссылке - https://github.com/DartPin/KassBox-Client

В данном проекте на базе Node-JS реализован сервер передающий данные из data.json и получающий данные из клиентской части проекта.

файл data.json содержит в себе несколько массивов. Скрипт в index.js распрееляет полученные данные из клиентской части по соответствующим массивам.
