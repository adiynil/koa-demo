/*
 * @Author: adiynil
 * @Date: 2022-01-07 16:04:29
 * @LastEditors: adiynil
 * @LastEditTime: 2022-03-03 13:53:39
 * @Description:
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  uid: { type: String, required: true },
  avatar: { type: String },
  name: { type: String, default: '' },
  create_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
