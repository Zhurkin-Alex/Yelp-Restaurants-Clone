const express = require('express')
const logger = require('morgan')
const indexRouter = require('./routes/indexRouter')
const app = express()
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/cafe', indexRouter)
module.exports = app
