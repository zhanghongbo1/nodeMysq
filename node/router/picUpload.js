const qiniu = require("qiniu");
const router = require("./loginRouter");
let accessKey = 'bDFoPgKyIKwHR-6Eq5DkAPg45eM313fSSd3m3LNz';
let secretKey = 'ti2lF-YReWRpImjbWTz1Zi3Ud61Qlc3KN8Z5Y2uK';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
let options = {
  scope: 'abaogea' //七牛资源目录
};
let putPolicy = new qiniu.rs.PutPolicy(options);
router.post('/getUploadTken', (req, res) => {
  let uploadToken = putPolicy.uploadToken(mac);
  res.json({
    returncode: 200,
    uploadToken: uploadToken
  })
})

module.exports=router