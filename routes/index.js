/*
 * @Author: adiynil
 * @Date: 2022-01-04 16:49:21
 * @LastEditors: adiynil
 * @LastEditTime: 2022-01-05 13:36:47
 * @Description: routes module
 */
const UserR = require('./users')
module.exports = app => {
  UserR(app)
}
