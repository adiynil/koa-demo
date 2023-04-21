/*
 * @Author: adiynil
 * @Date: 2022-07-07 15:05:55
 * @LastEditors: adiynil
 * @LastEditTime: 2022-07-21 14:46:56
 * @Description: MinioOSS utils
 */
const Minio = require('minio')
const fs = require('fs')

// const END_POINT = 'oss.wcsjyj.com'
// const PORT = 9988
// const useSSL = false
// const ACCESS_KEY = 'HyqTIFVRgEEY9nyX'
// const SECRET_KEY = 'zwHYA29JCM20I8w08g7279GmEjakqr2N'
// const BUCKET = 'test-220711'
// const PROXY_TARGET = 'http://oss.wcsjyj.com:9988'
const END_POINT = 'oss.wcsjyj.com'
const PORT = 4048
const useSSL = false
const ACCESS_KEY = 'Q29V15sktWh8Ksgy'
const SECRET_KEY = '1DFsNjmtKrlW7KdzcTO2HakIVAyUFDzW'
const BUCKET = 'static'
const PROXY_TARGET = 'https://oss-static.wcsjyj.com:91'
// const END_POINT = 'oss.fateguy.com'
// const PORT = 8098
// const useSSL = true
// const ACCESS_KEY = 'MsjpiQV3ucTmQtWY'
// const SECRET_KEY = 'L6Wl1nOBLNIS1YnI0cyT9ZY4ODFfHWcM'
// const BUCKET = 'test'
// const PROXY_TARGET = 'https://oss.fateguy.com'

function getExtention(filename) {
  return filename.split('.')[filename.split('.').length - 1]
}

class OssUtil {
  oss = null
  config = {
    endPoint: END_POINT,
    port: PORT,
    useSSL: useSSL,
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY
  }
  constructor(config) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
    this.oss = new Minio.Client(this.config)
  }
  listBuckets() {
    return new Promise((resolve, reject) => {
      this.oss.listBuckets((err, list) => {
        if (err) return reject(err)
        resolve(list)
      })
    })
  }
  uploadObjects(file) {
    const fileList = [],
      promiseList = [],
      resultList = []
    file instanceof Array ? fileList.push(...file) : fileList.push(file)
    fileList.forEach(_file => {
      let filename = `${_file.newFilename}-${_file.originalFilename}`
      promiseList.push(
        this.oss.putObject(
          BUCKET,
          filename,
          fs.createReadStream(_file.filepath)
        )
      )
      resultList.push({
        file: _file.originalFilename,
        url: `${
          PROXY_TARGET
            ? PROXY_TARGET
            : `${useSSL ? 'https' : 'http'}://${END_POINT}:${PORT}`
        }/${BUCKET}/${filename}`
      })
    })
    return new Promise((resolve, reject) => {
      Promise.allSettled(promiseList)
        .then(list => {
          let result = { success: 0, fail: 0, data: [] }
          list.forEach((res, index) => {
            if (res.status === 'fulfilled') {
              result.success += 1
              result.data.push(resultList[index])
            } else res.fail += 1
          })
          resolve(result)
        })
        .catch(e => reject(e))
    })
  }
  uploadObject(file) {
    return new Promise((resolve, reject) => {
      let filename = `${file.newFilename}-${file.originalFilename}`
      this.oss
        .putObject(BUCKET, filename, fs.createReadStream(file.filepath))
        .then(r =>
          resolve({
            file: file.originalFilename,
            etag: r.etag,
            url: `${
              PROXY_TARGET
                ? PROXY_TARGET
                : `${useSSL ? 'https' : 'http'}://${END_POINT}:${PORT}`
            }/${BUCKET}/${filename}`
          })
        )
        .catch(err => reject(err))
    })
  }
  removeObject(objName) {
    return this.oss.removeObject(BUCKET, objName)
  }
}

module.exports = OssUtil
