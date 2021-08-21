
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");

const config = require('./config');
const indexRoute = require('./routes/index');
const positiveRoute = require('./routes/positive')
const negativeRoute = require('./routes/negative')
const miscRoute = require('./routes/misc')

const app = express();

app.disable("x-powered-by");
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use('/', indexRoute);
console.log(`Route loaded, indexRoute`)
app.use(positiveRoute);
console.log(`Route loaded, positiveRoute`)
app.use(negativeRoute);
console.log(`Route loaded, negativeRoute`)
app.use(miscRoute);
console.log(`Route loaded, miscRoute`)

app.listen(process.env.port || config.port, () => {
  console.log(`Running on port ${process.env.port || config.port}.`);
});