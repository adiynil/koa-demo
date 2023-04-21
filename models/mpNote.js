/*
 * @Author: adiynil
 * @Date: 2022-03-03 13:52:54
 * @LastEditors: adiynil
 * @LastEditTime: 2022-03-03 15:58:36
 * @Description:
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  uid: { type: String, required: true },
  content: { type: String },
  create_at: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now }
})

const Note = mongoose.model('note', NoteSchema)

module.exports = Note
