/*
 * @Author: adiynil
 * @Date: 2022-01-05 13:38:01
 * @LastEditors: adiynil
 * @LastEditTime: 2022-01-05 17:39:53
 * @Description: custom sender function
 */
const createError = require("http-error");
module.exports = (app) => {
  app.context.send = (status, message, data) => {};
};

send(401);
send(401, "message");
send(401, "message", []);
console.log("sdc");
