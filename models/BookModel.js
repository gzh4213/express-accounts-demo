const mongoose = require('mongoose')
  // 5. 创建文档的结构对象
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
  })

  // 6.创建模型对象
  let BookModel = mongoose.model('book', BookSchema)

  module.exports = BookModel