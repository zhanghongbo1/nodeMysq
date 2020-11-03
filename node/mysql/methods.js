const pool = require('./index') //封装增删改查
/**
 * 
 * @param {*查询条件} name  
 * @param {*数据库名称} tableName 
 * @param {*查询条件} options 
 * @param {*查询}
 */
function select(name,tableName,options){  //查询 
  return new Promise((resolve,reject)=>{
      pool.query(`select ${name.toString()} from ${tableName} where ${options}`,function(err, rows){
            if(err){
              console.log(err)
              reject(err)
            }else{
              resolve({
                returncode:200,
                message:'成功',
                data:rows
              })
            }
      })
  })
}

function selectAll(name,tableName){
  return new Promise((resolve,reject)=>{
    pool.query(`select ${name.toString()} from ${tableName} `,function(err, rows){
          if(err){
            console.log(err)
            reject(err)
          }else{
            resolve({
              returncode:200,
              message:'成功',
              data:rows
            })
          }
    })
})
}



/**
 * 
 * @param {*插入的字段}tableName  
 * @param {*数据库名称} name 
 * @param {*插入字段对应的值} options 
 * @param {*增加}
 */
function add(tableName,name,options){  
    var option = Object.values(options) 
    var arr=''
    option.forEach(item=>{
      arr=arr+"'"+item+"'"+','
    })
  arr=  arr.slice(0,arr.length-1)
    
  return new Promise((resolve,reject)=>{
    console.log('-----------------------------------------------------------------',`insert  into ${tableName}(${name}) values(${arr})` ,'-----------------------------------------------------------------')
      pool.query(`insert  into ${tableName}(${name}) values(${arr})`,function(err, rows){
            if(err){
              console.log(err)
              reject(err)
            }else{
              resolve({
                returncode:200,
                message:'添加成功',
                data:rows
              })
            }
      })
  })
}

/**
 * 
 * @param {*表明} tableName 
 * @param {*条件} option 
 * @param {*删除}
 */
function deleteInfo(tableName, option){
  return new Promise((resolve,reject)=>{
    pool.query( `DELETE FROM ${tableName} ${option}`,function(err, rows){
          if(err){
            console.log(err)
            reject(err)
          }else{
            resolve({
              returncode:200,
              message:'删除成功',
              data:rows
            })
          }
    })
})
}
/**
 * 
 * @param {*表名} tableName 
 * @param {*字段} name 
 * @param {*字段的值} value 
 * @param {*更新条件} option 
 */

function update(tableName,name,value, option){
  return new Promise((resolve, reject) => {
        let sql = `update ${tableName} set ${name} = ${value} ${option}`
        pool.query(sql, function(err, result) {
          if(err){
            console.log(err);
            reject(err)
          }
          resolve({
            message:'成功',
            returncode:'200',
            data:result
          })
    })
  }).catch(err => err)
}

/**
 * 
 * @param {*表名} tableName 
 * @param {*条件} options 
 * @param {*当前页} currentPage 
 * @param {*每页数量} pageSize 
 */
function laypage(tableName,options,currentPage,pageSize){
  return new Promise((resolve,reject)=>{
    var total;
    pool.query(`select count(*) from ${tableName}`,async(err,result)=>{
        const total1 = await result
        total = total1
    })
    let sql=`select from ${tableName} where ${options} limit(${currentPage-1}*${pageSize},${pageSize})`
    pool.query(sql, function(err, result) {
      if(err){
        console.log(err);
        reject(err)
      }
      resolve({
        message:'成功',
        returncode:'200',
        data:result,
        total:total
      })
})

  }).catch(err=>console.log(err))
}
module.exports={
  select,
  add,
  deleteInfo,
  update,
  laypage,
  selectAll
}