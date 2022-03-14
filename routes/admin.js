var express = require('express');
var router = express.Router();
const admin = require('../db/adminModels')
var { verifyLogin } = require('../middlewares/admin')
var student = require('../db/models')

router.get('/',verifyLogin,async(req, res, next)=>{
  let studentData = await student.find()
  console.log(studentData);
  res.render('adminD',{'data':studentData});
});
router.get('/login',function(req,res){
  res.render('adminLogin')
})
router.post('/login',async(req,res)=>{
  

  const adminsave = await admin.findOne({admin:true})
  
  const username=req.body.user
  const password = req.body.password
  
  if(username===adminsave.username && password===adminsave.password){
    req.session.loggedIn=true
    res.send('success')
  }else{
    res.send('fail')
  }

})
module.exports = router
