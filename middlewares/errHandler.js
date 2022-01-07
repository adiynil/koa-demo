const createError = require('http-errors')

module.exports = async (ctx, next) => {
  ctx.response.status = 404
  ctx.body = createError({ message: 'API Not Supported' })
}
