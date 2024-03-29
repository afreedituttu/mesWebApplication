var express = require('express');
var router = express.Router();
var student = require('../db/models')
var sanitizer = require('sanitizer')
var serverstatus = require('../db/serverstatus')

/* GET home page. */
router.get('/',async function(req, res, next) {
  res.render('index');
});
router.get('/register',async function(req, res, next) {
  res.render('form');
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
          email:sanitizer.escape(req.body.email),
          address:sanitizer.escape(req.body.address),
          competition:sanitizer.escape(req.body.competition)
        })
        const result = await Student.save()
        res.render('form',{message:'Thankyou For Your Application',status:'success'})
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
        error.status = 'danger'
        res.render('form',error)
      }
    }
  }else{
    res.send('application closed')
  }
})
//to remove
var adm = require('../db/adminModels')
router.get('/testadmin',async(req,res)=>{
  let adms = new adm({username:'lakshmirakeshnair',password:'$2b$08$aDBI3KU7i8tKvk1GSH96lOaHplpq4RsXrtElmzkbvOvEvjjk/7mJW',admin:true})
  let rslt = await adms.save()
  res.send('svd')
})

module.exports = router;
