/*
 * @Author: adiynil
 * @Date: 2022-01-04 16:42:25
 * @LastEditors: adiynil
 * @LastEditTime: 2022-01-11 22:57:26
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
    let user = await UserM.getOne({ account })
    if (user) {
      return (res.body = user)
    }
    res.status = 404
    res.body = {
      message: 'account does not exist'
    }
  })
  .post('/:account', async (ctx, next) => {
    const { request: req, response: res } = ctx
    const { account } = ctx.params
    let isExist = await UserM.getOne({ account })
    if (isExist) {
      return (res.body = { message: 'account already exists' })
    }
    console.log(req.body)
    await UserM.insertMany({ ...req.body, account })
    let user = await UserM.getOne({ account })
    res.body = user
  })

module.exports = app => {
  app.use(router.routes(), router.allowedMethods())
}
