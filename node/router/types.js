var express = require('express');
const pool = require('../mysql/index')
const router = express.Router();
const { add, selectAll, update ,select } = require('../mysql/methods')
const getNowFormatDate = require('../utils')
/**
 * @param
 * 添加分类接口
 * 查询为NULL sq
 *  // pool.query(`select * from types where name is Null`,(err,rows)=>{
  //   console.log(rows)
  // })
 */
router.post('/add/type', async (req, res) => {   
 
  const res1 = await selectAll('*', 'types')
  let arr = []
  res1.data.forEach(item => {
    arr.push(item.type)
  })
  if (arr.includes(req.body.type)) {
    res.json({
      returncode: 500,
      message: '已经存在此分类'
    })
  } else {
    const result = await add('types', 'type,createtime', { ...req.body, createtime: getNowFormatDate() })
    res.json(result)
  }

})

/**
 * @param
 * 返回所有类型
 */

router.post('/getAllTypes', async(req,res)=>{
  const { data } = await selectAll('*', 'types')
  var arr = []
  data.forEach(item=>{
    arr.push(item.type)
  })
  arr=[...new Set(arr)]
  res.json({
    returncode:200,
    result:arr
  })
})


/**
 * @param
 * 添加书
 */

 router.post('/books/add',async (req,res)=>{
   try{
    const result = await add('types', 'name,price,oldprice,type,img1,img2,img3,createtime', { ...req.body, createtime: getNowFormatDate() })
    res.json(result)
   }catch(err){
     console.log(err)
   }

 })


/**
 * 表格获取
 */

 router.post('/book/table',async(req,res)=>{
  const res1 = await selectAll('*', 'types')
  let result = res1.data.filter(item=>{
    return item.price==''||item.price==null
  })
  result.forEach(item=>{
    item.children=[]
    res1.data.forEach(val=>{
      if(!result.includes(val)&&item.type==val.type){
        item.children.push(val)
      }
    })
  })
  res.json({
    returncode:200,
    data:result.slice(req.body.page-1,10),
    total:parseInt(result.length/10+1)
    
  })
 })
 /**
  * @params
  * 获取所有的书
  */
 router.post('/book/all',async(req,res)=>{
  const res1 = await selectAll('*', 'types')
  let result = res1.data.filter(item=>{
    return item.price
  })
  res.json({
    returncode:200,
    data:result.slice(req.body.page-1,10),
    total:parseInt(result.length/10+1)
  })
 })

 /**
  * @param
  * 更新上架还是下架
  */
 router.post('/upOrDown',async(req,res)=>{
   const isUp=req.body.isUp==1?'0':'1'
   console.log(req.body,'----------------------------------------------------')
  const res1 = await update('types','isUp',isUp,`where id=${req.body.id}`)
  res.send(res1)
 })

 router.post('/seacrch',(req,res)=>{
    console.log(`SELECT name from types WHERE name LIKE %${req.body.name}% `)
    pool.query(`SELECT name from types WHERE name LIKE '%${req.body.name}%' `,(err,rows)=>{
        res.json({
          data:rows,
          returncode:200
        })
    })

})
module.exports = router