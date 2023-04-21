/*
 * @Author: adiynil
 * @Date: 2022-01-07 16:04:29
 * @LastEditors: adiynil
 * @LastEditTime: 2022-03-03 13:48:09
 * @Description:
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  account: { type: String, required: true, lowercase: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'normal',
    enum: ['normal', 'admin']
  },
  avatar: String,
  name: { type: String, default: '' },
  site: { type: String, default: '' },
  description: { type: String, default: '' },
  status: {
    type: String,
    default: 'actived',
    enum: ['actived', 'forbidden']
  },
  option: Object,
  create_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now }
})

const User = mongoose.model('user', UserSchema)

User.getOne = (...args) => {
  return User.findOne(
    args[0],
    { ...args[1], password: 0, __v: 0, _id: 0 },
    args[2],
    args[3]
  )
}

module.exports = User
