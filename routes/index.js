var express = require('express');
var router = express.Router();
var student = require('../db/models')
var sanitizer = require('sanitizer')

/* GET home page. */
router.get('/',async function(req, res, next) {
  res.render('index1');
});
router.post('/register',async function(req,res,next){
  let info = req.body
  if(!info.name || !info.stream || !info.school || !info.phone || !info.wphone || !info.email){
    res.send('necessary informations are not provided')
  }else{
    try{
      const Student = new student({
        name:sanitizer.escape(req.body.name),
        stream:sanitizer.escape(req.body.stream),
        school:sanitizer.escape(req.body.school),
        phoneNumber:req.body.phone,
        whatsappNumber:req.body.wphone,
        email:sanitizer.escape(req.body.email)
      })
      const result = await Student.save()
      
      res.redirect('/')
    }catch(err){
      error = {}
      console.log(err);
      console.log(err.errors);
      try{
        if(err.keyPattern.email){
          error.message = 'email already exist'
        }else if(err.keyPattern.phoneNumber){
          error.message = 'phone number already exist'
        }else if(err.kind==='minlength'){
          error.message = 'minimum length of name should be 3'
        }else{
          res.send('some error accured')
        }
      }catch(err){
        res.send('some error accured')
      }
      res.render('index1',error)
    }
  }
})

module.exports = router;
