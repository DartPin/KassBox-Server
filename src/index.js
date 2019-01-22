const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
var fs = require("fs");
var jsonParser = bodyParser.json();

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`))

//отправка данных в клиент

app.get('/', (req, res) => {
    var content = fs.readFileSync("./src/data/data.json", "utf8");
    var data = JSON.parse(content);
    res.send(data);
})

//прием данных с клиента
app.post("/", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    var nameDealSt = req.body.body.nameDeal;
    console.log(nameDealSt)
    var nameWhoGiveSt = req.body.body.nameWhoGive;
    var nameWhoTakeSt = req.body.body.nameWhoTake;
    var summSt = req.body.body.summ;
    var commentSt = req.body.body.comment;
    var dateSt = req.body.body.date;
    var categorySt = req.body.body.category;
    var categoriesPlus = req.body.body;
    var categoriesMinus = req.body.body;
    var string = { nameDeal: nameDealSt, nameWhoGive: nameWhoGiveSt, nameWhoTake: nameWhoTakeSt, summ: summSt, comment: commentSt, date: dateSt, category: categorySt }
    var data = fs.readFileSync("./src/data/data.json", "utf8")
    var dataStr = JSON.parse(data);

    //разбивка полученных данных по категориям
    if (nameDealSt != undefined) {
        dataStr[0].arrStrings.push(string);
    } else
        if (categoriesPlus[0] === "оплата за заказ") {
            dataStr[0].categoriesPlus = categoriesPlus
        } else
            if (categoriesMinus[0] === "заработная плата") {
                dataStr[0].categoriesMinus = categoriesMinus
            }



    var data = JSON.stringify(dataStr);
    fs.writeFileSync("./src/data/data.json", data, "utf8")
    res.send(string)
})