const {
  DBHOST,
  DBPORT,
  DBNAME
} = require('../config/config')
// 1.安装mongoose
// 2.导入mongoose

const mongoose = require('mongoose')

module.exports = function(success, error) {
  // 3.连接mongodb
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

  // 4.设置回调
  // 连接成功回调
  mongoose.connection.once('open', () => {
    console.log('连接成功');
    success()
  }) 

  // 连接错误回调
  mongoose.connection.on('error', (err) => {
    console.log('连接错误:', err);
    error && error()
  })

  // 连接关闭回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  })
}


