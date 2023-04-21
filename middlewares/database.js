/*
 * @Author: adiynil
 * @Date: 2022-07-07 09:35:23
 * @LastEditors: adiynil
 * @LastEditTime: 2022-07-07 09:35:52
 * @Description: connect to mongodb
 */
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
