var express = require('express');
var router = express.Router();
const admin = require('../db/adminModels')
var { verifyLogin } = require('../middlewares/admin')
var student = require('../db/models');
var bcrypt = require('bcrypt')

router.get('/',verifyLogin,async(req, res, next)=>{
  let studentData = await student.find()
  res.render('adminD',{'data':studentData});
});
router.get('/login',async(req,res)=>{
  res.render('adminLogin')
})
router.post('/login',async(req,res)=>{
  try{
    let adminsave = await admin.find({admin:true})
    const username=req.body.user
    const password = req.body.password        
    if(username===adminsave[0].username){
      bcrypt.compare(password,adminsave[0].password).then((st)=>{
        console.log(st);
        if(st){
          
          req.session.loggedIn=true
          req.session.userId=adminsave[0]._id
          res.send('logged in, click here to access admin panel : <a href="http://localhost:3000/code123admin">here</a>')
        }else{
          res.redirect('http://locahost:3000/code123admin')
        }
      }).catch((err)=>{
        res.send('server error')
      });
    }else{
      res.redirect('http://locahost:3000/code123admin')
    }
  }catch(err){
    res.send('some technical error occured')
  }

})
module.exports = router
