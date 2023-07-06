const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

// 声明中间件
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

//记账本的列表
router.get('/account', checkTokenMiddleware, function(req, res, next) {
  console.log(req.user);
  //获取所有的账单信息
  // 读取集合信息
  AccountModel.find().sort({time: -1}).exec().then(data => {
    res.json({
      code: 0,
      msg: '读取成功',
      data: data
    })
  }).catch(err => {
    // res.status(500).send('读取失败～')
    res.json({
      code: -1,
      msg: '读取失败',
    })
  })
});

//新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
  // 插入数据
  AccountModel.create({
    ...req.body,
    // 修改 time
    time: moment(req.body.time).toDate()
  }).then(data => {
    //成功提醒
    // res.render('success', {msg: '添加成功哦~~~', url: '/account'});
    res.json({
      code: 0,
      msg: '创建成功',
      data: data
    })
  }).catch(err => {
    if (err) {
      // res.status(500).send('插入失败')
      res.json({
        code: 1002,
        msg: '创建失败～～'
      })
    }
  })
});

//删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({
    _id: id
  }).then(data => {
    //提醒
    // res.render('success', {msg: '删除成功~~~', url: '/account'});
    res.json({
      code: 0,
      msg: '删除成功',
      data: data
    })
  }).catch(err => {
    if (err) {
      // res.status(500).send('删除失败！')
      res.json({
        code: 1003,
        msg: '删除失败'
      })
    }
  })
  
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
  // 获取ID参数
  const {
    id
  } = req.params

  // 查询数据库
  AccountModel.findById(id).then(data => {
    res.json({
      code: 0,
      msg: '查询成功',
      data: data
    })
  }).catch(err => {
    return res.json({
      code: 1004,
      msg: '获取失败～～'
    })
  })
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
  // 获取ID参数
  const {
    id
  } = req.params

  // 更新数据库
  AccountModel.updateOne({
    _id: id
  }, req.body)
  .then(data => {
    // 更新成功后，再次查询数据库 获取单条数据
    return AccountModel.findById(id)
  }).then(data => {
    res.json({
      code: 0,
      msg: '更新成功',
      data: data
    })
  }).catch(err => {
    res.json({
      code: 1005,
      msg: '更新失败～～'
    })
  })
})

module.exports = router;
