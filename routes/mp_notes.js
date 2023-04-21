/*
 * @Author: adiynil
 * @Date: 2022-01-04 16:42:25
 * @LastEditors: adiynil
 * @LastEditTime: 2022-03-10 11:02:42
 * @Description:
 */
const createError = require('http-errors')
const got = require('got')
const Router = require('koa-router')
const router = new Router({
  prefix: '/mp/note'
})
const UserM = require('../models/mpUser')
const NoteM = require('../models/mpNote')
const appid = 'wxbfcacbf9fa563061'
const secret = 'edf095e05aa4aa04b92ec6440058d0d7'

router
  .get('/user/:code', async ctx => {
    const { request: req, response: res } = ctx
    const { code } = ctx.params
    let { openid } = await got({
      method: 'get',
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    }).json()
    let user = await UserM.findOne({ uid: openid })
    if (user) {
      return (res.body = user)
    }
    res.status = 404
    res.body = createError(404)
  })
  .post('/user/:code', async ctx => {
    const { request: req, response: res } = ctx
    const { code } = ctx.params
    let { openid } = await got({
      method: 'get',
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    }).json()
    const { name, avatar } = req.body
    let isExist = await UserM.findOne({ uid: openid })
    if (isExist) {
      res.status = 400
      res.body = { message: 'already exists' }
      return
    }
    await UserM.insertMany({ uid: openid, name, avatar })
    res.body = { uid: openid, name, avatar }
  })
  .put('/user/:code', async ctx => {
    const { request: req, response: res } = ctx
    const { code } = ctx.params
    let { openid } = await got({
      method: 'get',
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    }).json()
    const { name, avatar } = req.body
    let user = await UserM.findOne({ uid: openid })
    if (!user) {
      res.status = 400
      res.body = { message: 'account does not exist' }
      return
    }
    await UserM.findOneAndUpdate(
      { uid: openid },
      { avatar: avatar || user.avatar, name: name || user.name }
    )
    res.body = { message: 'OK' }
  })
  .post('/list/pageByQo', async ctx => {
    const { uid, pageSize, currentPage } = ctx.request.body
    const { response: res } = ctx
    const total = (await NoteM.find({ uid })).length
    const data = await NoteM.find({ uid })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
    res.body = {
      data,
      pagination: {
        currentPage,
        pageSize,
        total
      }
    }
  })
  .post('/list/addNote', async ctx => {
    const { uid, content } = ctx.request.body
    await NoteM.insertMany({ uid, content })
    ctx.body = { content, create_at: Date.now(), last_modified: Date.now() }
  })
  .put('/list/updateNoteById', async ctx => {
    const { id } = ctx.query
    const { content } = ctx.request.body
    const last_modified = Date.now()
    await NoteM.findByIdAndUpdate(id, { content, last_modified })
    ctx.body = { content, last_modified }
  })
  .delete('/list/removeNoteById', async ctx => {
    const { id } = ctx.query
    await NoteM.findByIdAndRemove(id)
    ctx.body = { message: 'OK' }
  })

module.exports = app => {
  app.use(router.routes(), router.allowedMethods())
}
// ;(async () => {
//   let { openid: uid } = await got({
//     method: 'get',
//     url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxbfcacbf9fa563061&secret=edf095e05aa4aa04b92ec6440058d0d7&js_code=053bFy000oBFsN1Phh0003w1Wa4bFy0c&grant_type=authorization_code`
//   }).json()
//   console.log(uid)
// })()
