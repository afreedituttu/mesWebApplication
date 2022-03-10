var express = require('express');
var router = express.Router();
const admin = require('../db/adminModels')
var { verifyLogin } = require('../middlewares/admin')

var student = require('../db/models')
router.get('/',verifyLogin,function(req, res, next) {
    res.render('adminD');
  });
router.get('/login',function(req,res){
  res.render('adminLogin')
})
router.post('/login',async(req,res)=>{
  console.log('here it is from admin login');
  console.log(req.body);

  const adminsave = await admin.findOne({admin:true})
  console.log(adminsave);
  const username=req.body.user
  const password = req.body.password
  console.log('username '+username);
  console.log('password '+password);
  console.log(adminsave.username);
  console.log(adminsave.password);
  if(username===adminsave.username && password===adminsave.password){
    res.send('success')
  }else{
    res.send('fail')
  }

})
module.exports = router