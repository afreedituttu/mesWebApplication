middleWares={verifyLogin:function(req,res,next){
    console.log('im in verifylogin2')
    console.log(req.session.logInId);
    if(req.session.logInId){
        console.log('loged in user');
        next()
    }else{
        console.log('im in verifylogin');
        res.redirect('http://localhost:3000/code123admin/login')
        next()
    }
}}
module.exports = middleWares