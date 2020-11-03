var mysql = require("mysql");
var pool = mysql.createPool({
  host: "47.99.112.162", //主机
  port: "3306", // 端口号
  user: "books", // 用户名
  password: "123456", // 密码
  database: "books",
});
pool.getConnection(function (err, connection) {
  if (err) {
    console.log("建立连接失败");
  } else {
    console.log('建立连接')
  }
})
module.exports = pool