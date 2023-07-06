const mongoose = require('mongoose')
// 创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: Date,
  type: {
    type: Number,
    default: -1
  },
  account: {
    type: Number,
    required: true
  },
  remarks: {
    type: String
  }
})

// 创建模型对象
let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel