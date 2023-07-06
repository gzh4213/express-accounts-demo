const mongoose = require('mongoose')

// 创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
  // 用户名
  username: String,
  // 密码
  password: String
})

// 创建模型对象
let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel