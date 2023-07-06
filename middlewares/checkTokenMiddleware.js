const jwt = require('jsonwebtoken')
const {
  secret
} = require('../config/config')

// 检测token中间件
module.exports = (req, res, next) => {
  // 获取 token
  const token = req.get('token')
  // 判断
  if (!token) {
    return res.json({
      code: '2003',
      msg: 'token 缺失',
      data: null
    })
  }

  // 校验 token
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: '2004',
        msg: 'token 校验失败～～',
        data: null
      })
    }
    // 存储token
    req.user = data
    // 如果token校验成功
    next()
  })
}