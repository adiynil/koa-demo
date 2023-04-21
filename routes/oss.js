/*
 * @Author: adiynil
 * @Date: 2022-07-06 10:30:30
 * @LastEditors: adiynil
 * @LastEditTime: 2022-07-13 17:02:49
 * @Description: handle the request to OSS
 */
const Minio = require('minio')
const fs = require('fs')
const Router = require('koa-router')
const router = new Router({
  prefix: '/oss'
})

const OssUtil = require('../middlewares/OssUtil')
const OSS = new OssUtil()

router.post('/uploads', async (ctx, next) => {
  const { request: req, response: res } = ctx
  let result = await OSS.uploadObjects(req.files.file)
  res.body = result
})
router.post('/upload', async (ctx, next) => {
  const { request: req, response: res } = ctx
  let result = await OSS.uploadObject(req.files.file)
  res.body = result
})

router.get('/buckets', async ctx => {
  let list = await OSS.listBuckets()
  ctx.body = list
})

router.delete('/removeObject/:objName', async ctx => {
  let { params } = ctx.request
  let { objName } = params
  await OSS.removeObject(objName)
  ctx.body = { message: 'OK' }
})

module.exports = app => {
  app.use(router.routes(), router.allowedMethods())
}
