var express = require('express');
var router = express.Router();
var student = require('../db/models')
var { verifyLogin } = require('../middlewares/admin')
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index1');

});
router.post('/register',async function(req,res,next){
  req.session.user = 'user'
  req.session.id = true
  
  try{
    const Student = new student({
      name:req.body.name,
      stream:req.body.stream,
      school:req.body.school,
      phoneNumber:req.body.phone,
      whatsappNumber:req.body.wphone,
      email:req.body.email
    })
    const result = await Student.save()
    
    res.redirect('/')
  }catch(err){
    error = {}
    console.log(err);
    if(err.keyPattern.email){
      error.message = 'email already exist'
    }else if(err.keyPattern.phoneNumber){
      error.message = 'phone number already exist'
    }else{
      error.message = 'unknown error'
    }
  }
  res.render('index1',error)
})
// router.get('/code123admin',function(req, res, next) {
//   
//   res.render('adminD');
// });

module.exports = router;
