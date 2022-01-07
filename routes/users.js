/*
 * @Author: adiynil
 * @Date: 2022-01-04 16:42:25
 * @LastEditors: adiynil
 * @LastEditTime: 2022-01-06 10:42:55
 * @Description:
 */
const Router = require('koa-router')
const router = new Router({
  prefix: '/users'
})
const UserM = require('../models/User')

router
  .get('/:account', async (ctx, next) => {
    const { request: req, response: res } = ctx
    const { account } = ctx.params
    let user = await UserM.findOne({ account }, { password: 0, __v: 0, _id: 0 })
    if (!user) {
      res.status = 404
      res.body = {
        message: 'Not Found'
      }
      return
    }
    res.body = user
  })
  .post('/:account', async (ctx, next) => {
    const { request: req, response: res } = ctx
    const { account } = ctx.params
    let isExit = UserM.findOne({ account })
    isExit && (res.message = 'account exit')
    console.log(req.body)
    // await UserM.insertMany({ account, ...req.body })
    // let user = await UserM.findOne({ account })
    // res.body = user || {}
  })

module.exports = app => {
  app.use(router.routes(), router.allowedMethods())
}
