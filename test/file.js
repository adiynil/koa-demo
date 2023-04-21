/*
 * @Author: adiynil
 * @Date: 2022-03-14 17:21:12
 * @LastEditors: adiynil
 * @LastEditTime: 2022-03-15 11:42:16
 * @Description:
 */
const getVideoBase64 = url =>
  new Promise(function (resolve) {
    let dataURL = ''
    let video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous') //处理跨域
    video.setAttribute('src', url)
    video.setAttribute('width', '880')
    video.setAttribute('height', '495')
    video.setAttribute('autoplay', 'autoplay') // 如果没有autoplay可能获取到黑屏
    document.body.appendChild(video) // 需先插入到文档流再移除，否则可能会导致视频在后台播放
    video.addEventListener('canplaythrough', function () {
      let canvas = document.createElement('canvas'),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(video, 0, 0, width, height) //绘制canvas
      dataURL = canvas.toDataURL('image/jpeg') //转换为base64
      document.body.removeChild(video)
      resolve(dataURL)
    })
  })
const base64ImgtoFile = (dataurl, filename = 'file') => {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

const getLocalPreviewUrl = file => {
  console.log(URL.createObjectURL(file))
  return URL.createObjectURL(file)
}

const getOnlineVideoCover = async url =>
  getLocalPreviewUrl(base64ImgtoFile(await getVideoBase64(url)))

console.log(
  getOnlineVideoCover(
    'http://kenuo-dscp-dev.oss-cn-shenzhen.aliyuncs.com/1630572975838.mp4'
  )
)
