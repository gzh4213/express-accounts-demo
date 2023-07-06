// 检测登录中间件
module.exports = (req, res, next) => {
  console.log('username:', req.session.username);
  // 判断
  if (!req.session.username) {
    return res.redirect('/login')
  }

  next()
}