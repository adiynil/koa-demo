/*
 * @Author: adiynil
 * @Date: 2022-01-07 16:04:29
 * @LastEditors: adiynil
 * @LastEditTime: 2022-07-07 10:17:50
 * @Description:
 */
// use dotenv
const dotenv = require('dotenv')
dotenv.config()
// use mongoose
const mongoose = require('mongoose')
const { DB_URL, DB_USER, DB_PASSWORD, DB_NAME } = process.env
mongoose
  .connect(DB_URL, {
    user: DB_USER || '',
    pass: DB_PASSWORD || '',
    dbName: DB_NAME
    // autoIndex: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // keepAlive: true
  })
  .then(() => {
    console.log('success connected to mongodb')
  })
  .catch(e => {
    console.log('error')
    console.log(e)
  })

const Koa = require('koa')
const app = new Koa()

// use body-parser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// use routes
const useRoutes = require('./routes')
useRoutes(app)

//use error handler
const errHandler = require('./middlewares/errHandler')
app.use(errHandler)
module.exports = app
