const express = require('express');
const router = express.Router();
const md5 = require('md5')
const UserModel = require('../../models/UserModel')
const jwt = require('jsonwebtoken')
const {
  secret
} = require('../../config/config')


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
      return res.json({
        code: '2002',
        msg: '用户名或密码错误～',
        data: null
      })
    }

    // 创建token
    const token = jwt.sign({
      username: data.username,
      _id: data._id
    }, secret, {
      expiresIn: 60 * 60 * 24 * 7
    })

    // 响应token
    res.json({
      code: 0,
      msg: '登录成功',
      data: token
    })
    
  })
  .catch(err => {
    // res.status(500).send('登录失败～')
    res.json({
      code: '2001',
      msg: '数据库读取失败～',
      data: null
    })
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
