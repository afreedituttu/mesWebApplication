var express = require('express');
var router = express.Router();
var { verifyLogin } = require('../middlewares/admin')
const mongoose = require('mongoose')
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
  const admin = student.find({admin:true})
  console.log(admin);
  res.send('success')
})
module.exports = router