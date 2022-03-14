middleWares={verifyLogin:function(req,res,next){
    if(req.session.logInId){
        
        next()
    }else{
        
        res.redirect('http://localhost:3000/code123admin/login')
        next()
    }
}}
module.exports = middleWares
