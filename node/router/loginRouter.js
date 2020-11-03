var express = require('express');
const pool = require('../mysql/index')
const router = express.Router();
const { add } = require('../mysql/methods')
//连接池
const jwt = require('jsonwebtoken');  //jwtoken
router.post('/user/info',(req,res)=>{
  res.json({
    src:'https://ftp.bmp.ovh/imgs/2020/10/f37a15412b37b712.png',
    name:"张三",
    returncode:200
  })
})


/*
后台登录
*/
router.post('/work/login', (req, res) => {
  console.log(req.body)
  pool.query(`select * from workLogin where userName="${req.body.username}" and passWord="${req.body.password}"`, async (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      if (rows.length <= 0) {
        const result = await add('workLogin', 'userName,passWord', req.body)
        console.log(result)
        res.send({
          returncode: 200,
          ...result, token: jwt.sign({
            username: req.body.username,
            password: req.body.password
          }, 'loveyou', {
            expiresIn: 60 * 3600 * 3600
          })
        })
      } else {
        res.send(
          {
            returncode: 200,
            message: "登录成功",
            token: jwt.sign({
              username: req.body.username,
              password: req.body.password
            }, 'loveyou', {
              expiresIn: 60 * 3600 * 3600
            })
          }
        )
      }
    }
  })
})

module.exports = router