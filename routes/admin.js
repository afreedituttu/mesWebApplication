var express = require('express');
var router = express.Router();
const admin = require('../db/adminModels')
var { verifyLogin } = require('../middlewares/admin')
var student = require('../db/models');
var bcrypt = require('bcrypt')
var limiter = require('express-rate-limit');
const mongoose = require('mongoose');
var serverstatus = require('../db/serverstatus')

router.get('/',verifyLogin,async(req, res, next)=>{
  let studentData = await student.find().sort({_id:-1}).limit(5).lean()
  let studentcount = await student.find().sort({_id:-1}).limit(5).count().lean()
  let server = await serverstatus.find()
  let serverstat = server[0].status
  res.render('dashboard',{'Data':studentData,'status':serverstat,'count':studentcount,layout:'Adminlayout.hbs'});
});
router.get('/alldata',verifyLogin,async(req,res)=>{
  let studentData = await student.find().lean()
  res.render('adminalldata',{'Data':studentData,layout:'Adminlayout.hbs'});
})
router.get('/status',verifyLogin,async(req,res)=>{
  let server = await serverstatus.find()
  console.log(server[0].status);
  res.render('as',{statuses:server[0].status,s:'s',layout:'Adminlayout.hbs'})
})
router.post('/status',verifyLogin,async(req,res)=>{
  console.log('im enter');
  let server = await serverstatus.find()
  if(server[0].status){
    console.log('im at flasing stts');
      let latestserverstatus = await serverstatus.updateOne({},{status:false})
  }else{
    console.log('im at trueing stts');
    let latestserverstatus = await serverstatus.updateOne({},{status:true})
  }

  res.redirect('/code123admin/status')
})
router.get('/delete/:id',verifyLogin,async(req,res)=>{
  const id = req.params.id
  if(!id){
    res.redirect('/')
  }else{
    student.deleteOne({_id:mongoose.Types.ObjectId(id)}).then(()=>{
      res.redirect('/code123admin/alldata')
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
router.post('/logout',verifyLogin,async(req,res)=>{
  req.session.loggedIn = false
  req.session.userId = ''
  res.redirect('/code123admin')
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
          res.redirect('/code123admin')
        }else{
          res.redirect('/code123admin')
        }
      }).catch((err)=>{
        res.send('server error')
      });
    }else{
      res.redirect('/code123admin')
    }
  }catch(err){
    res.send('some technical error occured')
  }

})
module.exports = router
