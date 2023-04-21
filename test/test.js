/*
 * @Author: adiynil
 * @Date: 2022-03-16 15:15:00
 * @LastEditors: adiynil
 * @LastEditTime: 2022-07-08 14:40:16
 * @Description:
 */
// process.on('unhandledRejection', e => {
//   console.log('process handle it')
// })

// new Promise((res, rej) => {
//   if (true) rej(0)
// })
//   .then(r => console.log('i handle myself'))
//   .catch(e => console.log('i handle myself'))
var Minio = require('minio')

var minioClient = new Minio.Client({
  endPoint: 'oss.fateguy.com',
  port: 8098,
  useSSL: false,
  accessKey: 'afei',
  secretKey: 'gyFvjhgvYTfugf'
})

minioClient.listBuckets((err, buckets) => {
  if (err) return console.log(err)
  console.log(buckets)
})

minioClient.putObject()

// let obj = []
// let objStream = minioClient.getObject('test', '国徽.png')
// objStream.on('data', s => obj.push(s))
// objStream.on('end', o => console.log(o))

// let data = []
// let stream = minioClient.listObjects('test')
// stream.on('data', function (obj) {
//   data.push(obj)
// })
// stream.on('end', function (obj) {
//   console.log(data)
// })
// stream.on('error', function (err) {
//   console.log(err)
// })

// Promise.allSettled([
//   Promise.resolve(1),
//   Promise.reject(0),
//   Promise.resolve(true)
// ])
//   .then(res => console.log(res))
//   .catch(e => console.log(e))
