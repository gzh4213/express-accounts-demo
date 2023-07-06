var express = require('express');
var router = express.Router();
const md5 = require('md5')

const UserModel = require('../../models/UserModel')

// 注册
router.get('/reg', (req, res) => {
  // 响应HTML内容
  res.render('auth/reg')
})

// 注册用户api
router.post('/reg', (req, res) => {
  // 做表单验证
  // 获取请求体数据
  console.log(req.body);
  UserModel.create({...req.body, password: md5(req.body.password)})
  .then(data => {
    res.render('success', { msg: '注册成功', url: '/login'})
  })
  .catch(err => {
    res.status(500).send('注册失败，请稍后再试 ')
  })
})

// 登录页面
router.get('/login', (req, res) => {
  // 响应HTML内容
  res.render('auth/login')
})

// 登录接口
router.post('/login', (req, res) => {
  // 先获取用户名和密码
  const {
    username,
    password
  } = req.body

  // 查询数据库
  UserModel.findOne({
    username,
    password: md5(password)
  })
  .then(data => {
    // 判断data
    console.log(data);
    if (!data) {
      res.send('账号或密码错误')
      return
    }
    // 写入session
    req.session.username = data.username
    req.session._id = data._id
    res.render('success', { msg: '登录成功', url: '/account'})
  })
  .catch(err => {
    res.status(500).send('登录失败～')
  })
})


// 退出登录
router.post('/logout', (req, res) => {
  // 销毁 session
  req.session.destroy(() => {
    res.render('success', {
      msg: '退出成功',
      url: '/login'
    })
  })
})

module.exports = router;
