var express = require('express');
var router = express.Router();
const admin = require('../db/adminModels')
var { verifyLogin } = require('../middlewares/admin')
var student = require('../db/models');

router.get('/',verifyLogin,async(req, res, next)=>{
  let studentData = await student.find()
  console.log(studentData);
  res.render('adminD',{'data':studentData});
});
router.get('/login',async(req,res)=>{
//   const admins = new admin({
//     username:'afreedi',
//     password:'afreedi',
//     admin:true
//   })
//   const result = await admins.save()

  res.render('adminLogin')
})
router.post('/login',async(req,res)=>{
  try{
    let adminsave = await admin.find({admin:true})
    const username=req.body.user
    const password = req.body.password
    
    if(username===adminsave[0].username && password===adminsave[0].password){
      req.session.loggedIn=true
      req.session.userId=adminsave[0]._id
      res.send('success')
    }else{
      res.send('fail')
    }
  }catch(err){
    res.send('some technical error occured')
  }

})
module.exports = router
