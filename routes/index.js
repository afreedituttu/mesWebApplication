var express = require('express');
var router = express.Router();
var student = require('../db/models')
var sanitizer = require('sanitizer')
var serverstatus = require('../db/serverstatus')

/* GET home page. */
router.get('/',async function(req, res, next) {
  res.render('index1');
});
router.post('/register',async function(req,res,next){
  let server = await serverstatus.find()
  if(server[0].status){
    let info = req.body
    if(!info.name || !info.school || !info.phone || !info.wphone || !info.email){
      res.send('necessary informations are not provided')
    }else{
      try{
        const Student = new student({
          name:sanitizer.escape(req.body.name),
          school:sanitizer.escape(req.body.school),
          phoneNumber:sanitizer.escape(req.body.phone),
          whatsappNumber:sanitizer.escape(req.body.wphone),
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
  }else{
    res.send('application closed')
  }
})

module.exports = router;
