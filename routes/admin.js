var express = require('express');
var router = express.Router();
const admin = require('../db/adminModels')
var { verifyLogin } = require('../middlewares/admin')
var student = require('../db/models');
var bcrypt = require('bcrypt')
var limiter = require('express-rate-limit');
const mongoose = require('mongoose');

router.get('/',verifyLogin,async(req, res, next)=>{
  let studentData = await student.find().lean()
  console.log(studentData);
  res.render('adminD',{'Data':studentData});
});
router.get('/delete/:id',verifyLogin,async(req,res)=>{
  const id = req.params.id
  if(!id){
    res.redirect('/')
  }else{
    student.deleteOne({_id:mongoose.Types.ObjectId(id)}).then(()=>{
      res.redirect('/code123admin')
    }).catch((err)=>{
      console.log(err);
      res.send('some technical error')
    })
  }
})
router.get('/login',async(req,res)=>{
  res.render('adminLogin')
})
// for avoiding bruteforce attack
const Loginlimiter = limiter({
  windowMs:5000,
  max:4,
})
router.post('/login',Loginlimiter,async(req,res)=>{
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
