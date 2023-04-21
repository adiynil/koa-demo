/*
 * @Author: adiynil
 * @Date: 2022-01-04 16:49:21
 * @LastEditors: adiynil
 * @LastEditTime: 2022-07-07 09:39:10
 * @Description: routes module
 */
// const UserR = require('./users')
const ossR = require('./oss')
const mpNotes = require('./mp_notes')
module.exports = app => {
  // UserR(app)
  // mpNotes(app)
  ossR(app)
}
